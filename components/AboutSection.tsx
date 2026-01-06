import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Gift, MessageCircle, ShieldCheck, ArrowRight, Star } from 'lucide-react';

const BENEFITS = [
  {
    icon: MessageCircle,
    title: "Resenha VIP no WhatsApp",
    description: "Acesso direto ao grupo fechado. Notícias em primeira mão e debate de alto nível sem fake news."
  },
  {
    icon: Gift,
    title: "Sorteios do Manto Sagrado",
    description: "Concorra mensalmente a camisas oficiais e produtos exclusivos da loja do Flamengo."
  },
  {
    icon: Star,
    title: "Destaque Absoluto",
    description: "Acesso antecipado aos vídeos novos e ícones exclusivos que diferenciam você da multidão."
  },
  {
    icon: ShieldCheck,
    title: "Distintivos de Lealdade",
    description: "Sua paixão evolui. Ganhe badges exclusivos ao lado do seu nome conforme o tempo passa."
  }
];

const AboutSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Elements - Subtler texture */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
      
      {/* Gradient Overlays for Readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-red-900/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
                <Crown className="text-yellow-500" size={24} fill="currentColor" />
                <span className="text-yellow-500 font-bold uppercase tracking-widest text-sm">Seja Membro Oficial</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-6 text-white drop-shadow-sm">
              Jogue junto com a <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Elite da Torcida</span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-10 leading-relaxed font-medium">
              O YouTube é apenas o começo. Ao se tornar membro do canal <strong className="text-white">Zona Rubro-Negra</strong>, você deixa de ser apenas um espectador e passa a fazer parte do nosso vestiário. Fortaleça a mídia alternativa feita de <strong>torcedor para torcedor</strong> e garanta vantagens que só quem fecha com a gente tem. Aqui não tem imparcialidade, tem paixão.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {BENEFITS.map((benefit, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="bg-neutral-900/80 backdrop-blur-sm p-3 rounded-lg h-min border border-white/10 text-red-600 shadow-lg shrink-0 group-hover:border-red-600/50 transition-colors">
                    <benefit.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase text-sm mb-1">{benefit.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <motion.a
              href="https://www.youtube.com/@ZonaRubronegra/join"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-700 to-red-600 text-white px-8 py-4 rounded font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all border border-red-500/20"
            >
              Quero ser Membro Agora <ArrowRight size={18} />
            </motion.a>
            <p className="mt-4 text-[10px] text-gray-500 font-medium">
              *Cancelamento possível a qualquer momento pelo YouTube.
            </p>
          </motion.div>

          {/* Visual Content - Membership Card Concept */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
             <div className="relative z-10 w-full max-w-md mx-auto aspect-[4/5] bg-gradient-to-br from-neutral-900 to-black rounded-2xl border border-white/10 shadow-2xl p-8 flex flex-col justify-between overflow-hidden group">
                {/* Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[80px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-900/10 blur-[60px] rounded-full"></div>
                
                {/* Header Card */}
                <div className="flex justify-between items-start relative z-10">
                    <div>
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Cartão de Membro</div>
                        <h3 className="text-2xl font-black italic text-white">VIP ACCESS</h3>
                    </div>
                    <Crown size={32} className="text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                </div>

                {/* Center Content */}
                <div className="relative z-10 text-center py-8">
                    <div className="w-24 h-24 mx-auto rounded-full border-4 border-red-600 p-1 mb-4 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                        <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
                             <img src="/logo.png" alt="ZRN" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="text-white font-bold text-lg">VOCÊ</div>
                    <div className="text-red-500 text-xs font-bold uppercase tracking-widest">Torcedor Oficial</div>
                </div>

                {/* Footer Card */}
                <div className="space-y-3 relative z-10">
                    <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-red-600 to-yellow-500"
                        ></motion.div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500">
                        <span>Desde 2024</span>
                        <span>Nível: Lendário</span>
                    </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
             </div>
             
             {/* Back Card Element for depth */}
             <div className="absolute top-4 -right-4 w-full max-w-md h-full bg-red-900/20 rounded-2xl border border-red-600/20 -z-10 blur-sm transform rotate-6"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;