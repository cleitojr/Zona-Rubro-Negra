import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, MessageCircle } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="bg-red-600 py-24 relative overflow-hidden">
        {/* Abstract pattern background */}
        <div className="absolute inset-0 opacity-10">
             <div className="absolute top-0 left-0 w-64 h-64 bg-black rounded-full filter blur-[80px]"></div>
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-black rounded-full filter blur-[80px]"></div>
        </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase text-white mb-6 drop-shadow-md"
        >
          Não fique de fora da resenha.
        </motion.h2>
        <p className="text-red-100 text-lg font-medium max-w-2xl mx-auto mb-10">
          Faça parte da comunidade que mais cresce no YouTube. Informação com credibilidade e paixão rubro-negra.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-red-600 px-8 py-4 rounded font-bold uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl"
          >
            <Youtube size={20} />
            Inscrever-se
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-800/40 border border-red-700 text-white px-8 py-4 rounded font-bold uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-red-800 transition-colors"
          >
            <MessageCircle size={20} />
            Discord
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;