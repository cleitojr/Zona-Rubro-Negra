import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Youtube, Users } from 'lucide-react';

const Hero: React.FC = () => {
  const count = useMotionValue(100000);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString('pt-BR'));

  useEffect(() => {
    const animation = animate(count, 143274, { duration: 3.5, ease: "circOut" });
    return animation.stop;
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Overlay - Flag Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.05 }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
          src="https://images.unsplash.com/photo-1532186651327-6ac23687d189?q=80&w=2069&auto=format&fit=crop" 
          alt="Bandeira Rubro-Negra tremulando" 
          className="w-full h-full object-cover opacity-70"
        />
        
        {/* Gradient Overlays for the "Rubro-Negra" aesthetic and text readability */}
        {/* 1. Heavy bottom fade to blend with next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-[#050505]"></div>
        
        {/* 2. Side vignettes to focus attention on center */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
        
        {/* 3. Red tint to enhance the flag color */}
        <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-6 drop-shadow-2xl"
        >
          <span className="text-white">Zona </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800 filter drop-shadow-lg">
            Rubro
          </span>
          <br />
          <span className="text-white">Negra</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-200 italic text-lg md:text-xl mb-12 font-medium drop-shadow-md"
        >
          "De rubro-negros para rubro-negros"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-6"
        >
          <motion.a
            href="https://www.youtube.com/channel/UCaWf9Ud7RqD2YftLuBkLzjw?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all min-w-[260px]"
          >
            <Youtube size={22} />
            INSCREVA-SE NO CANAL
          </motion.a>

          {/* Real Time Counter Next to Button */}
          <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-3 rounded-lg border border-white/10 group hover:border-red-600/30 transition-colors min-w-[260px] md:min-w-0 justify-between md:justify-start">
              <div className="flex flex-col items-start">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Somos</p>
                  <motion.span className="text-2xl font-black text-white tabular-nums leading-none">
                     {rounded}
                  </motion.span>
              </div>
              
              <div className="h-8 w-px bg-white/10 mx-2"></div>
              
              <div className="flex flex-col items-end md:items-start">
                  <span className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                    <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Em Tempo Real</span>
                  </span>
                  <span className="text-xs font-bold text-white uppercase">Inscritos</span>
              </div>
          </div>
        </motion.div>

        {/* Stats Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 flex items-center justify-center gap-12 border-t border-white/10 pt-8 w-full max-w-2xl"
        >
          <div className="text-center">
            <h4 className="text-white text-lg font-bold flex items-center gap-2 justify-center">
                <Users size={18} className="text-red-600"/> Comunidade
            </h4>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mt-1">Mais Engajada</p>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="text-center">
            <h4 className="text-white text-lg font-bold">Diário</h4>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mt-1">Conteúdo</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;