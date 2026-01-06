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
      {/* Background - The Red & Black Flag */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
        {/* The Stripes (Flag Pattern) */}
        <motion.div 
          initial={{ scale: 1.1, rotate: -2 }}
          animate={{ 
            scale: 1.2,
            rotate: 1,
            x: [-15, 0, -15],
            y: [-10, 10, -10]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            repeatType: "mirror", 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 w-[140%] h-[140%] -top-[20%] -left-[20%] origin-center"
          style={{
            backgroundImage: `repeating-linear-gradient(
                180deg,
                #080808 0%,
                #080808 12%,
                #991B1B 12%,
                #991B1B 24%
            )`
          }}
        >
             {/* Gradient Overlay to simulate fabric folds/waves */}
             <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/40 mix-blend-multiply"></div>
             <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-black/20 to-black/60 mix-blend-multiply"></div>
        </motion.div>
        
        {/* Noise Texture for Realism (Fabric feel) */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" 
             style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` 
             }}
        ></div>

        {/* Cinematic Vignettes for focus */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/95"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-6 drop-shadow-2xl"
        >
          <span className="text-white">Zona </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800 filter drop-shadow-[0_2px_10px_rgba(220,38,38,0.5)]">
            Rubro
          </span>
          <br />
          <span className="text-white">Negra</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-200 italic text-lg md:text-xl mb-12 font-medium drop-shadow-md bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full border border-white/5 inline-block"
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
          <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-3 rounded-lg border border-white/10 group hover:border-red-600/30 transition-colors min-w-[260px] md:min-w-0 justify-between md:justify-start">
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