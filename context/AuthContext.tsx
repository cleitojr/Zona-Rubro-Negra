import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import { UserProfile } from '../types';

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ 
    user: null, 
    profile: null,
    loading: true, 
    signOut: async () => {},
    refreshProfile: async () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      // 1. Tenta buscar o perfil existente
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle(); // maybeSingle evita erro se não existir
      
      if (error) {
        console.error('Erro ao buscar perfil:', error);
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      let currentProfile = data as UserProfile | null;

      // 2. FALLBACK: Se não existir perfil (ex: erro no gatilho SQL), cria manualmente
      if (!currentProfile && session?.user) {
         console.log("Perfil não encontrado, criando manualmente...");
         const newProfile = {
            id: userId,
            email: session.user.email || '',
            full_name: session.user.user_metadata?.full_name || 'Torcedor',
            role: 'user' as const,
            membership_tier: 'free' as const,
            youtube_connected: false
         };
         
         const { error: insertError } = await supabase.from('profiles').insert(newProfile);
         
         if (!insertError) {
             currentProfile = newProfile as UserProfile;
         } else {
             console.error("Erro ao criar perfil fallback:", insertError);
         }
      }

      if (currentProfile) {
        // 3. Lógica de Vinculação Automática com Google/YouTube
        // Verifica se o login atual foi feito via Google
        const isGoogle = session?.user?.app_metadata?.provider === 'google' || 
                         session?.user?.identities?.some((id: any) => id.provider === 'google');
        
        // Se for Google e ainda não estiver marcado como conectado no DB
        if (isGoogle && !currentProfile.youtube_connected) {
             console.log("Detectado login Google, vinculando YouTube...");
             
             // Atualização Otimista (Visual imediato)
             const updatedProfile = { ...currentProfile, youtube_connected: true };
             setProfile(updatedProfile);
             
             // Atualização no Banco em Background
             await supabase.from('profiles').update({ youtube_connected: true }).eq('id', userId);
        } else {
             setProfile(currentProfile);
        }
      } else {
        setProfile(null); 
      }
    } catch (err) {
      console.error("Erro fatal no fetchProfile:", err);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        if (session?.user) {
            await fetchProfile(session.user.id);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: string, session: any) => {
      console.log("Auth event:", event);
      setUser(session?.user ?? null);
      if (session?.user) {
         await fetchProfile(session.user.id);
      } else {
         setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
        await fetchProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);