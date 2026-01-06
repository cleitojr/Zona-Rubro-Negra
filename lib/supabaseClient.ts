import { createClient } from '@supabase/supabase-js';

// ==============================================================================
// CONFIGURAÇÃO DO SUPABASE
// ==============================================================================
// Para o sistema de login funcionar, você precisa criar um projeto no Supabase:
// 1. Acesse https://supabase.com/dashboard e crie um novo projeto.
// 2. Vá em Project Settings (ícone de engrenagem) > API.
// 3. Copie a "Project URL" e cole na variável SUPABASE_URL abaixo.
// 4. Copie a chave "anon" / "public" e cole na variável SUPABASE_ANON_KEY abaixo.
// ==============================================================================

const SUPABASE_URL = 'https://cpksijhycxsjqqjnspjx.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwa3Npamh5Y3hzanFxam5zcGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDUwMjAsImV4cCI6MjA4MzI4MTAyMH0.MbkJ9ZfcRpZ--r59m1KD0mXiC2Uk_JhffDfE57v9kQc';

// Verifica se as chaves foram configuradas corretamente para evitar erros de execução
const isConfigured = 
  SUPABASE_URL.includes('supabase.co') && 
  !SUPABASE_URL.includes('exemplo-seu-projeto') &&
  SUPABASE_ANON_KEY.length > 30 && // Chaves reais são longas (JWT)
  !SUPABASE_ANON_KEY.includes('sua-chave-anon-aqui');

// Exporta o cliente real se configurado, ou um "mock" (falso) que retorna erros amigáveis
export const supabase = isConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : {
      auth: {
        signUp: async () => ({ 
          data: null, 
          error: { message: 'Falta configurar a chave ANON no arquivo lib/supabaseClient.ts' } 
        }),
        signInWithPassword: async () => ({ 
          data: null, 
          error: { message: 'Falta configurar a chave ANON no arquivo lib/supabaseClient.ts' } 
        }),
        signInWithOAuth: async () => ({ 
          data: null, 
          error: { message: 'Falta configurar a chave ANON no arquivo lib/supabaseClient.ts' } 
        }),
        signOut: async () => ({ error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      }
    } as any;