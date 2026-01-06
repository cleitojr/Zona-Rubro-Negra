import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, ExternalLink, Check } from 'lucide-react';
import { PARTNERS } from '../constants';
import PartnerModal from './PartnerModal';

const PartnersSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <>
      <section id="partners" className="py-20 bg-[#080808]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black uppercase mb-2">Parceiros Oficiais</h2>
              <p className="text-gray-400">Descontos exclusivos para quem é inscrito no ZRN.</p>
            </div>
            <button 
              onClick={() => setIsPartnerModalOpen(true)}
              className="bg-white text-black font-bold uppercase text-xs px-6 py-3 rounded hover:bg-gray-200 transition-colors"
            >
              Seja um parceiro
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARTNERS.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-neutral-900 border border-white/5 rounded-xl p-8 hover:border-red-600/30 transition-all duration-300 group shadow-lg flex flex-col justify-between relative"
              >
                <div>
                  <h3 className="text-2xl font-black uppercase mb-1 text-white">{partner.name}</h3>
                  <p className="text-gray-500 text-xs font-medium mb-8">{partner.description}</p>
                  
                  <div className="bg-[#050505] rounded border border-white/10 p-1 flex justify-between items-center pl-4 group-hover:border-red-900/50 transition-colors mb-6 relative">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-500 font-bold uppercase">Cupom</span>
                      <span className="text-red-500 font-bold text-sm tracking-widest">{partner.coupon}</span>
                    </div>
                    
                    <div className="relative">
                      <button 
                          onClick={() => handleCopy(partner.coupon, partner.id)}
                          className="p-2 hover:text-white text-gray-400 transition-colors" 
                          title="Copiar"
                      >
                          {copiedId === partner.id ? <Check size={14} className="text-green-500"/> : <Copy size={14} />}
                      </button>

                      {/* Tooltip */}
                      <AnimatePresence>
                          {copiedId === partner.id && (
                              <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: -30 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute left-1/2 -translate-x-1/2 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap pointer-events-none"
                              >
                                  Cupom copiado!
                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-green-600"></div>
                              </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <a 
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold uppercase text-xs py-3 rounded hover:bg-gray-200 transition-colors"
                >
                  Ver Mais <ExternalLink size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PartnerModal isOpen={isPartnerModalOpen} onClose={() => setIsPartnerModalOpen(false)} />
    </>
  );
};

export default PartnersSection;