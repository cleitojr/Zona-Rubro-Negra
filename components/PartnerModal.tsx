import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Building, Phone, Send, CheckCircle, FileText } from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Construct mailto link
      const subject = `Proposta de Parceria: ${company || name}`;
      const body = `Nome: ${name}\nEmpresa: ${company}\nEmail: ${email}\nWhatsApp: ${phone}\n\nProposta/Mensagem:\n${message}`;
      const mailtoLink = `mailto:zonarubronegra@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.location.href = mailtoLink;

      setLoading(false);
      setSuccess(true);
      
      // Close modal after showing success message
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setName('');
        setCompany('');
        setEmail('');
        setPhone('');
        setMessage('');
      }, 3000);
    }, 1500);
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
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[70] overflow-y-auto pointer-events-none">
            <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-[#0a0a0a] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative flex flex-col pointer-events-auto"
                >
                {/* Header Line */}
                <div className="h-1 w-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"></div>

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
                        Mensagem Preparada!
                        </h3>
                        <p className="text-gray-400 max-w-xs mx-auto">
                           Redirecionando para seu aplicativo de e-mail para finalizar o envio para <strong>zonarubronegra@gmail.com</strong>.
                        </p>
                    </div>
                    ) : (
                    <>
                        <div className="mb-8">
                            <h3 className="text-2xl font-black uppercase text-white mb-2 flex items-center gap-2">
                                <span className="text-yellow-500">Parceria</span> ZRN
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Preencha o formulário abaixo para apresentar sua marca para a maior torcida do mundo.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Building className="absolute left-3 top-3.5 text-gray-500" size={18} />
                                    <input
                                    type="text"
                                    placeholder="Nome da Empresa"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full bg-neutral-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                                    />
                                </div>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3.5 text-gray-500" size={18} />
                                    <input
                                    type="text"
                                    placeholder="Seu Nome"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-neutral-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
                                    <input
                                    type="email"
                                    placeholder="Email Corporativo"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-neutral-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                                    />
                                </div>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3.5 text-gray-500" size={18} />
                                    <input
                                    type="tel"
                                    placeholder="WhatsApp / Telefone"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-neutral-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <textarea
                                placeholder="Descreva brevemente sua proposta ou interesse de parceria..."
                                required
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full bg-neutral-900/50 border border-white/10 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white hover:bg-gray-200 text-black font-bold uppercase py-4 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all flex items-center justify-center gap-2 mt-2"
                            >
                                {loading ? (
                                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                                ) : (
                                <>
                                    Enviar Proposta <Send size={18} />
                                </>
                                )}
                            </button>
                            
                            <p className="text-[10px] text-gray-500 text-center mt-2">
                                Ao enviar, você será redirecionado para seu cliente de e-mail padrão.
                            </p>
                        </form>
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

export default PartnerModal;