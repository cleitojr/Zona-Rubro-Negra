import React from 'react';
import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from '../constants';

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`;
  }
  return name.slice(0, 2);
};

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-20 bg-[#050505]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">
            Quem faz a <span className="text-red-600">Resenha</span>
          </h2>
          <p className="text-gray-400">Uma equipe apaixonada e comprometida em trazer o melhor conteúdo sobre o Mengão.</p>
        </div>

        {/* CSS Grid layout for perfect alignment starting from the left */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-neutral-900 rounded-lg overflow-hidden border border-white/5 hover:border-red-600/50 transition-colors shadow-lg w-full"
            >
              {/* Image Container */}
              <div className="aspect-[3/4] bg-neutral-800 w-full relative overflow-hidden flex items-end justify-center">
                {/* Background Gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 to-neutral-900 z-0"></div>
                
                {member.image ? (
                   <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-top relative z-10 group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                        // Fallback logic: Hide image, show initials
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.fallback-content');
                        if (fallback) fallback.classList.remove('hidden');
                        if (fallback) fallback.classList.add('flex');
                    }}
                   />
                ) : null}

                {/* Fallback Content (Initials) - Hidden by default unless image fails or is missing */}
                <div className={`fallback-content absolute inset-0 items-center justify-center z-0 bg-neutral-800 ${member.image ? 'hidden' : 'flex'}`}>
                    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900">
                        <div className="w-20 h-20 rounded-full bg-neutral-900 border-2 border-red-900/30 flex items-center justify-center shadow-inner mb-2 group-hover:border-red-600 transition-colors">
                            <span className="text-2xl font-black text-red-600 tracking-wider">
                                {getInitials(member.name)}
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-20 opacity-90"></div>

                {/* Overlay details */}
                <div className="absolute bottom-0 left-0 w-full p-4 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold uppercase text-sm md:text-base leading-tight mb-1 drop-shadow-md">{member.name}</h3>
                  <div className="h-0.5 w-8 bg-red-600 mb-2 group-hover:w-16 transition-all duration-300"></div>
                  <p className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
            <div className="bg-neutral-900 border border-white/10 rounded-full px-6 py-2 flex items-center gap-3">
                <span className="text-xs text-gray-400 font-bold uppercase">Colaboradores:</span>
                <div className="flex gap-3">
                    <span className="flex items-center gap-1 text-[10px] font-bold"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span> Letícia Kelly</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span> Isaú Jr</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;