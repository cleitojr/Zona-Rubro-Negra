import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Youtube, MessageCircle, Bell, ShieldCheck, ExternalLink, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import MemberCard from './MemberCard';

interface MemberAreaProps {
  isOpen: boolean;
  onClose: () => void;
}

const MemberArea: React.FC<MemberAreaProps> = ({ isOpen, onClose }) => {
  const { user, profile } = useAuth();
  const [linking, setLinking] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);

  if (!isOpen) return null;

  const handleLinkYouTube = async () => {
    setLinking(true);
    try {
        // Trigger Google Login Flow to Link/Verify
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.href, // Returns to this page
                scopes: 'https://www.googleapis.com/auth/youtube.readonly'
            }
        });
        if (error) throw error;
        // The page will redirect, so no need to stop loading
    } catch (error) {
        console.error("Error linking:", error);
        setLinking(false);
        alert("Erro ao conectar com Google. Tente novamente.");
    }
  };

  const isMember = profile?.membership_tier && profile.membership_tier !== 'free';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-md z-[60] overflow-y-auto"
      >
        <div className="min-h-screen container mx-auto px-4 py-8 relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h2 className="text-2xl md:text-3xl font-black uppercase text-white flex items-center gap-3">
                    <ShieldCheck className="text-red-600" /> Área do Membro
                </h2>
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Actions & Perks */}
                <div className="space-y-8">
                    
                    {/* 1. YouTube Integration */}
                    <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-red-600 p-3 rounded-lg">
                                <Youtube className="text-white" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg uppercase">Integração YouTube</h3>
                                <p className="text-xs text-gray-400">Vincule sua conta para validar seu nível de membro.</p>
                            </div>
                        </div>

                        {profile?.youtube_connected ? (
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3 text-green-500 font-bold text-sm">
                                <ShieldCheck size={18} /> Conta Vinculada com Sucesso
                            </div>
                        ) : (
                            <button 
                                onClick={handleLinkYouTube}
                                disabled={linking}
                                className="w-full bg-white text-black font-bold uppercase py-3 rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                {linking ? <RefreshCw className="animate-spin" /> : <Youtube size={18} className="text-red-600" />}
                                {linking ? 'Redirecionando para Google...' : 'Vincular Canal do YouTube'}
                            </button>
                        )}
                        <p className="text-[10px] text-gray-500 mt-3 text-center">
                            Utilize o mesmo e-mail da sua assinatura no YouTube para validação automática.
                        </p>
                    </div>

                    {/* 2. WhatsApp VIP Group */}
                    <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                        {!isMember && (
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-center p-6">
                                <ShieldCheck className="text-gray-500 mb-2" size={40} />
                                <h4 className="font-bold text-white uppercase mb-1">Conteúdo Bloqueado</h4>
                                <p className="text-xs text-gray-400 mb-4">Torne-se membro para acessar o grupo VIP.</p>
                                <a href="https://www.youtube.com/@ZonaRubronegra/join" target="_blank" rel="noreferrer" className="text-xs text-red-500 hover:text-red-400 font-bold uppercase underline">
                                    Seja Membro Agora
                                </a>
                            </div>
                        )}
                        
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-[#25D366] p-3 rounded-lg">
                                <MessageCircle className="text-white" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg uppercase">Resenha VIP</h3>
                                <p className="text-xs text-gray-400">Grupo exclusivo no WhatsApp.</p>
                            </div>
                        </div>
                        
                        <p className="text-sm text-gray-300 mb-6">
                            Acesse notícias em primeira mão, participe de enquetes sobre o canal e converse com a equipe.
                        </p>

                        <a 
                            href="https://chat.whatsapp.com/KkFvGCsPUCr4aOEa2Q4FYA" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold uppercase py-3 rounded transition-colors flex items-center justify-center gap-2"
                        >
                            Acessar Grupo <ExternalLink size={16} />
                        </a>
                    </div>

                    {/* 3. Notification Preferences */}
                    <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-600 p-3 rounded-lg">
                                    <Bell className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg uppercase">Lembretes</h3>
                                    <p className="text-xs text-gray-400">Avisos sobre renovação e sorteios.</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setEmailNotif(!emailNotif)}
                                className={`w-12 h-6 rounded-full transition-colors relative ${emailNotif ? 'bg-green-500' : 'bg-gray-600'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${emailNotif ? 'left-7' : 'left-1'}`}></div>
                            </button>
                         </div>
                         {emailNotif && (
                             <p className="text-[10px] text-green-500 mt-4 flex items-center gap-1">
                                 <ShieldCheck size={12} /> Você receberá um e-mail 3 dias antes da renovação.
                             </p>
                         )}
                    </div>
                </div>

                {/* Right Column: Member Card */}
                <div className="flex flex-col items-center justify-start pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10">
                    <h3 className="text-xl font-bold uppercase mb-8 text-center">Sua Identidade Rubro-Negra</h3>
                    <MemberCard profile={profile} />
                    
                    <div className="mt-12 text-center">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-2">Status da Assinatura</p>
                        {isMember ? (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/20 border border-green-500/30 rounded text-green-500 font-bold text-sm uppercase">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                Ativa - Renova em 15/05
                            </div>
                        ) : (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded text-gray-400 font-bold text-sm uppercase">
                                Inativa
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MemberArea;