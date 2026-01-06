import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Gift, MessageCircle, ShieldCheck, ArrowRight, Star, QrCode, Wifi } from 'lucide-react';

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
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight mb-6 text-white drop-shadow-sm">
              Faça parte do nosso time <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">a partir de R$1,99</span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-10 leading-relaxed font-medium">
              O YouTube é apenas o começo. Ao se tornar membro do canal <strong className="text-white">Zona Rubro-Negra</strong>, você deixa de ser apenas um espectador e passa a fazer parte do nosso vestiário. 
              Com planos <strong>Bronze, Prata, Ouro e Diamante</strong>, você garante vantagens exclusivas e fortalece a mídia alternativa feita de <strong>torcedor para torcedor</strong>.
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

          {/* Visual Content - Sócio Torcedor Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:flex justify-center items-center perspective-1000"
          >
             {/* The Card Container - Vertical Format (Badge style) */}
             <div className="relative w-[340px] h-[540px] bg-gradient-to-br from-[#1a1a1a] to-black rounded-3xl border border-white/10 shadow-2xl overflow-hidden group transform hover:scale-[1.02] transition-transform duration-500">
                
                {/* Background Texture & Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                
                {/* Red Sash/Design */}
                <div className="absolute top-0 right-0 w-[150%] h-full bg-red-900/20 transform -skew-x-12 translate-x-20"></div>
                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-red-600/20 to-transparent"></div>

                {/* Card Header */}
                <div className="relative z-10 p-8 flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="ZRN" className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg" />
                        <div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">SÓCIO TORCEDOR</div>
                            <div className="text-white font-black text-xl italic tracking-tighter">ZONA RUBRO-NEGRA</div>
                        </div>
                    </div>
                    <Wifi className="text-white/30 rotate-90" size={24} />
                </div>

                {/* Card Body - Chip & Number */}
                <div className="relative z-10 px-8 mt-4">
                    {/* Gold Chip */}
                    <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-md border border-yellow-700/50 shadow-inner flex items-center justify-center mb-8 relative overflow-hidden">
                        <div className="absolute inset-0 border border-black/10 rounded-md"></div>
                        <div className="w-8 h-full border-l border-r border-black/10"></div>
                        <div className="w-full h-4 border-t border-b border-black/10 absolute top-1/2 -translate-y-1/2"></div>
                    </div>

                    <div className="space-y-1">
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">NÚMERO DE MEMBRO</div>
                        <div className="font-mono text-3xl text-white tracking-widest drop-shadow-md">#001</div>
                    </div>
                </div>

                {/* Card Footer - User Info & QR */}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/90 to-transparent pt-12">
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="mb-4">
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">TITULAR</div>
                                <div className="text-white font-bold text-lg uppercase tracking-wide">SEU NOME</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">CATEGORIA</div>
                                <div className="text-red-500 font-black text-lg uppercase tracking-wide flex items-center gap-2">
                                    DIAMANTE <Star size={14} fill="currentColor" />
                                </div>
                            </div>
                        </div>
                        
                        {/* QR Code */}
                        <div className="bg-white p-2 rounded-lg shadow-lg">
                            <QrCode size={48} className="text-black" />
                        </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center border-t border-white/10 pt-4">
                         <span className="text-[9px] text-gray-600 uppercase font-bold">Válido em todo território nacional</span>
                         <span className="text-[9px] text-gray-600 uppercase font-bold">Desde 2024</span>
                    </div>
                </div>

                {/* Holographic/Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none mix-blend-overlay group-hover:via-white/10 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent h-1/2 pointer-events-none"></div>
             </div>
             
             {/* Glow Effect behind */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] bg-red-600/30 blur-[100px] -z-10 rounded-full"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;