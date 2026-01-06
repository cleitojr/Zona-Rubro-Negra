import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, CheckCircle, Phone, Youtube } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'signup';

const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simula requisição de login/cadastro
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
        onClose();
        // Reset form
        setName('');
        setPhone('');
        setEmail('');
        setPassword('');
        setMode('login');
      }, 1500);
    }, 1500);
  };

  const handleSocialLogin = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            onClose();
        }, 1500);
    }, 1000);
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60]"
          />
          <div 
            className="fixed inset-0 z-[70] overflow-y-auto"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
          >
            <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0a0a0a] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative flex flex-col my-4 md:my-8"
                >
                {/* Decorative Header Line */}
                <div className="h-1 w-full bg-gradient-to-r from-red-800 via-red-600 to-red-800"></div>

                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="p-6 md:p-8">
                    {success ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-green-500/10 text-green-500 p-4 rounded-full mb-6"
                        >
                        <CheckCircle size={48} />
                        </motion.div>
                        <h3 className="text-2xl font-black text-white mb-2">
                        {mode === 'login' ? 'Bem-vindo de volta!' : 'Conta criada!'}
                        </h3>
                        <p className="text-gray-400">Redirecionando para a área exclusiva...</p>
                    </div>
                    ) : (
                    <>
                        <div className="text-center mb-6">
                        <div className="flex justify-center mb-6">
                            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center border-2 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)] p-1">
                                <img src="/logo.png" alt="ZRN" className="w-full h-full object-cover rounded-full" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-black uppercase text-white mb-2">
                            {mode === 'login' ? 'Acessar Conta' : 'Criar Nova Conta'}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {mode === 'login' 
                            ? 'Entre para acessar conteúdos exclusivos.' 
                            : 'Junte-se à maior comunidade rubro-negra.'}
                        </p>
                        </div>

                        {/* Social Login */}
                        <button 
                            onClick={handleSocialLogin}
                            className="w-full bg-white hover:bg-gray-100 text-black font-bold uppercase py-3 rounded-lg flex items-center justify-center gap-3 transition-colors mb-6 shadow-md"
                        >
                            <Youtube className="text-red-600" size={20} />
                            Entrar com Google / YouTube
                        </button>

                        <div className="relative flex items-center gap-4 mb-6">
                            <div className="h-px bg-white/10 flex-1"></div>
                            <span className="text-[10px] text-gray-500 font-bold uppercase">OU EMAIL</span>
                            <div className="h-px bg-white/10 flex-1"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {mode === 'signup' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                <div className="relative">
                                    <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
                                    <input
                                    type="text"
                                    placeholder="Nome"
                                    required={mode === 'signup'}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-neutral-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
                                    />
                                </div>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3.5 text-gray-500" size={18} />
                                    <input
                                    type="tel"
                                    placeholder="WhatsApp"
                                    required={mode === 'signup'}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-neutral-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
                                    />
                                </div>
                            </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
                                <input
                                type="email"
                                placeholder="Seu e-mail"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-neutral-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
                                <input
                                type="password"
                                placeholder="Sua senha"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-neutral-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
                                />
                            </div>
                        </div>

                        {mode === 'login' && (
                            <div className="flex justify-end">
                            <button type="button" className="text-xs text-gray-400 hover:text-white transition-colors">
                                Esqueceu a senha?
                            </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase py-3 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                            <>
                                {mode === 'login' ? 'Entrar' : 'Cadastrar'}
                                <ArrowRight size={18} />
                            </>
                            )}
                        </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-white/5 text-center">
                        <p className="text-sm text-gray-400">
                            {mode === 'login' ? 'Ainda não é membro?' : 'Já possui cadastro?'}
                            <button 
                            onClick={toggleMode}
                            className="ml-2 text-red-500 font-bold hover:text-red-400 transition-colors"
                            >
                            {mode === 'login' ? 'Criar conta grátis' : 'Fazer login'}
                            </button>
                        </p>
                        </div>
                    </>
                    )}
                </div>
                </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadModal;