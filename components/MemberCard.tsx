import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, QrCode, Wifi, Share2, Loader2, Check } from 'lucide-react';
import { UserProfile } from '../types';
import html2canvas from 'html2canvas';

interface MemberCardProps {
  profile: UserProfile | null;
}

const MemberCard: React.FC<MemberCardProps> = ({ profile }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [sharing, setSharing] = useState(false);
  const [success, setSuccess] = useState(false);

  const tierColors: Record<string, string> = {
    free: 'from-gray-700 to-gray-900',
    bronze: 'from-orange-700 to-orange-900',
    prata: 'from-gray-300 to-gray-500',
    ouro: 'from-yellow-400 to-yellow-600',
    diamante: 'from-blue-400 to-blue-600', 
  };

  const currentTier = profile?.membership_tier || 'free';

  const handleShare = async () => {
    if (!cardRef.current) return;
    setSharing(true);
    
    try {
        // Temporarily reset transform for clean capture
        const element = cardRef.current;
        const originalTransform = element.style.transform;
        element.style.transform = 'none';

        const canvas = await html2canvas(element, {
            backgroundColor: null,
            scale: 2, // Higher quality
            useCORS: true,
            logging: false
        });

        // Restore transform (though react/framer might handle this, good to be safe)
        element.style.transform = originalTransform;

        canvas.toBlob(async (blob) => {
            if (!blob) return;

            const file = new File([blob], 'carteirinha-zrn.png', { type: 'image/png' });
            
            if (navigator.share && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: 'Minha Carteirinha ZRN',
                        text: 'Sou membro oficial do Zona Rubro-Negra!',
                        files: [file]
                    });
                    setSuccess(true);
                } catch (err) {
                    console.log("Share closed", err);
                }
            } else {
                // Fallback: Download
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'carteirinha-zrn.png';
                link.click();
                setSuccess(true);
            }
            
            setTimeout(() => setSuccess(false), 3000);
            setSharing(false);
        });

    } catch (err) {
        console.error("Failed to generate card image", err);
        setSharing(false);
        alert("Erro ao gerar imagem. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col items-center">
        {/* Wrapper to handle 3D perspective, but ref is on the inner card for capture */}
        <div className="perspective-1000 group">
            <motion.div
                ref={cardRef}
                initial={{ rotateY: 0 }}
                whileHover={{ rotateY: 5, rotateX: 5 }}
                className="relative w-[300px] h-[480px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
            >
                {/* Base Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${currentTier === 'diamante' ? 'from-cyan-900 via-blue-900 to-purple-900' : 'from-[#1a1a1a] to-black'}`}></div>
                
                {/* Texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>

                {/* Decorative Sashes */}
                <div className="absolute top-0 right-0 w-[150%] h-full bg-gradient-to-l from-white/5 to-transparent transform -skew-x-12 translate-x-20 pointer-events-none"></div>
                
                {/* Holographic Overlay for high tiers */}
                {(currentTier === 'diamante' || currentTier === 'ouro') && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 mix-blend-overlay animate-pulse pointer-events-none"></div>
                )}

                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full justify-between p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center overflow-hidden">
                                <img src="/logo.png" alt="ZRN" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">CLUBE DE MEMBROS</p>
                                <p className="text-white font-black italic tracking-tighter">ZONA RUBRO-NEGRA</p>
                            </div>
                        </div>
                        <Wifi className="text-white/40 rotate-90" size={20} />
                    </div>

                    {/* Chip & Tier */}
                    <div className="mt-8">
                        <div className={`w-12 h-9 rounded-md shadow-inner flex items-center justify-center mb-6 relative overflow-hidden bg-gradient-to-br ${currentTier === 'free' ? 'from-gray-600 to-gray-800' : 'from-yellow-200 via-yellow-400 to-yellow-600'}`}>
                            <div className="absolute inset-0 border border-black/10 rounded-md"></div>
                            <div className="w-8 h-full border-l border-r border-black/10"></div>
                            <div className="w-full h-4 border-t border-b border-black/10 absolute top-1/2 -translate-y-1/2"></div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">NÍVEL ATUAL</p>
                            <h3 className={`text-2xl font-black uppercase tracking-widest flex items-center gap-2 ${currentTier === 'diamante' ? 'text-cyan-400' : 'text-white'}`}>
                                {currentTier} <Star size={18} fill="currentColor" className={currentTier === 'ouro' ? 'text-yellow-400' : ''} />
                            </h3>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-auto pt-6 border-t border-white/10">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">MEMBRO</p>
                                <p className="text-white font-bold text-lg uppercase tracking-wide truncate max-w-[160px]">
                                    {profile?.full_name || 'Torcedor ZRN'}
                                </p>
                                <p className="text-[10px] text-gray-400 mt-1">{profile?.email}</p>
                            </div>
                            <div className="bg-white p-1.5 rounded shadow-lg">
                                <QrCode size={32} className="text-black" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

        <button 
            onClick={handleShare}
            disabled={sharing}
            className="mt-6 flex items-center gap-2 text-gray-400 hover:text-white text-xs font-bold uppercase transition-colors disabled:opacity-50"
        >
            {sharing ? <Loader2 className="animate-spin" size={16} /> : success ? <Check size={16} className="text-green-500"/> : <Share2 size={16} />} 
            {sharing ? 'Gerando Imagem...' : success ? 'Compartilhado!' : 'Compartilhar Cartão'}
        </button>
    </div>
  );
};

export default MemberCard;