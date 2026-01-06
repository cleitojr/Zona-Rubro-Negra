import React, { useEffect, useState } from 'react';
import { Play, ArrowRight, Loader2, Share2, Check, X, Link as LinkIcon, Twitter, Facebook, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LATEST_VIDEOS } from '../constants';
import { Video } from '../types';

const CHANNEL_ID = 'UCaWf9Ud7RqD2YftLuBkLzjw';
const CHANNEL_URL = `https://www.youtube.com/channel/${CHANNEL_ID}`;

// Helper to calculate relative time
const getTimeAgo = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " anos atrás";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " meses atrás";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " dias atrás";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " horas atrás";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " min atrás";
  return "Agora mesmo";
};

// Helper to check if video is likely live based on title (RSS limitation)
const isLiveVideo = (title: string) => {
  const t = title.toLowerCase();
  return t.includes('ao vivo') || t.includes('live') || t.includes('🔴');
};

const LatestVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeShareVideo, setActiveShareVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
        // Fetch slightly more items to cover the expanded sidebar
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
          // Fetch up to 6 videos (1 main + 5 sidebar)
          const mappedVideos: Video[] = data.items.slice(0, 6).map((item: any) => {
            const videoId = item.guid.split(':')[2]; 
            return {
              id: videoId,
              title: item.title,
              thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
              views: 'Assista agora',
              timeAgo: getTimeAgo(item.pubDate),
              link: item.link,
              isLive: isLiveVideo(item.title)
            };
          });
          setVideos(mappedVideos);
        } else {
            setVideos(LATEST_VIDEOS);
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        setVideos(LATEST_VIDEOS);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleShare = async (e: React.MouseEvent, video: Video) => {
    e.preventDefault(); // Prevent opening the video link
    e.stopPropagation();

    if (!video.link) return;

    // Try native share API (Mobile)
    if (navigator.share) {
        try {
            await navigator.share({
                title: video.title,
                text: `Confira este vídeo do Zona Rubro-Negra: ${video.title}`,
                url: video.link
            });
        } catch (err) {
            console.log('Share cancelled or failed', err);
        }
    } else {
        // Fallback/Desktop: Open Custom Share Modal
        setActiveShareVideo(video);
    }
  };

  const shareToSocial = (platform: 'whatsapp' | 'twitter' | 'facebook', video: Video) => {
    const text = encodeURIComponent(`Confira este vídeo do Zona Rubro-Negra: ${video.title}`);
    const url = encodeURIComponent(video.link || '');
    
    let shareUrl = '';
    switch(platform) {
        case 'whatsapp': shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`; break;
        case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`; break;
        case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setActiveShareVideo(null);
  };

  const copyToClipboard = async (video: Video) => {
      try {
        await navigator.clipboard.writeText(video.link || '');
        setCopiedId(video.id); // Set copied state for the modal button feedback
        setTimeout(() => {
            setCopiedId(null);
            setActiveShareVideo(null);
        }, 1500);
      } catch (err) {
        console.error('Failed to copy', err);
      }
  };

  const featuredVideo = videos.length > 0 ? videos[0] : null;
  // Use videos 1 through 5 for sidebar (max 5 items)
  const sideVideos = videos.length > 0 ? videos.slice(1, 6) : [];

  return (
    <section id="videos" className="py-20 bg-[#050505] relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black uppercase mb-2">Últimos Vídeos</h2>
            <p className="text-gray-400">Acompanhe tudo o que rola no canal oficial.</p>
          </div>
          <a href={CHANNEL_URL} target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-red-600 font-bold text-sm hover:text-red-500 transition-colors">
            VER CANAL COMPLETO <ArrowRight size={16} />
          </a>
        </div>

        {loading ? (
            <div className="flex items-center justify-center h-[400px]">
                <Loader2 className="animate-spin text-red-600" size={48} />
            </div>
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Video */}
          {featuredVideo && (
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 relative group rounded-lg aspect-video bg-neutral-900 block overflow-hidden shadow-2xl"
            >
                <a href={featuredVideo.link} target="_blank" rel="noreferrer" className="block w-full h-full relative bg-neutral-800">
                    <img 
                      src={featuredVideo.thumbnail} 
                      alt="Main Video" 
                      loading="lazy"
                      decoding="async"
                      onLoad={(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-0 group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-black/50 to-transparent">
                        {/* LIVE TAG */}
                        {featuredVideo.isLive && (
                            <div className="flex items-center gap-2 mb-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                                </span>
                                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">AO VIVO</span>
                            </div>
                        )}

                        <h3 className="text-xl md:text-3xl font-black uppercase leading-tight mb-2 group-hover:text-red-500 transition-colors line-clamp-2 pr-12">
                            {featuredVideo.title}
                        </h3>
                        <p className="text-gray-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                            {featuredVideo.timeAgo}
                        </p>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-red-600 p-4 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.6)]">
                            <Play fill="white" className="ml-1" />
                        </div>
                    </div>
                </a>

                {/* Share Button for Featured Video */}
                <button
                    onClick={(e) => handleShare(e, featuredVideo)}
                    className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-red-600 backdrop-blur-md p-2.5 rounded-full border border-white/10 text-white transition-all duration-300 hover:scale-110 group/share cursor-pointer"
                    title="Compartilhar"
                >
                    <Share2 size={20} />
                </button>
            </motion.div>
          )}

          {/* Sidebar List - Expanded */}
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2 mb-2 border-l-4 border-red-600 pl-3">
                <h3 className="font-bold uppercase tracking-wider text-sm">Mais Recentes</h3>
             </div>

             {sideVideos.map((video, index) => (
               <motion.div 
                 key={video.id}
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: index * 0.1 }}
                 viewport={{ once: true }}
                 className="relative group rounded hover:bg-neutral-900 transition-colors"
               >
                 <a 
                    href={video.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex gap-4 p-2 cursor-pointer"
                 >
                    <div className="relative w-40 aspect-video rounded overflow-hidden flex-shrink-0 bg-neutral-800">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          loading="lazy"
                          decoding="async"
                          onLoad={(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')}
                          className="w-full h-full object-cover opacity-0 transition-opacity duration-500" 
                        />
                        {video.isLive && (
                                <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600/90 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                    <span className="text-[8px] font-bold text-white uppercase">Ao Vivo</span>
                                </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-center flex-1 pr-8">
                        <h4 className="font-bold text-sm leading-tight mb-1 line-clamp-2 group-hover:text-red-500 transition-colors">{video.title}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">{video.timeAgo}</p>
                    </div>
                 </a>
                 
                 {/* Share Button for Sidebar Item */}
                 <button
                    onClick={(e) => handleShare(e, video)}
                    className="absolute top-2 right-2 md:top-auto md:bottom-auto md:right-2 md:self-center p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
                    title="Compartilhar"
                 >
                    <Share2 size={16} />
                 </button>
               </motion.div>
             ))}
          </div>
        </div>
        )}
      </div>

      {/* Custom Share Modal for Desktop */}
      <AnimatePresence>
        {activeShareVideo && (
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setActiveShareVideo(null)}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[90%] max-w-sm"
                >
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-800 via-red-600 to-red-800"></div>
                        <button 
                            onClick={() => setActiveShareVideo(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                        
                        <h3 className="text-xl font-black uppercase text-white mb-6 pr-8">Compartilhar Vídeo</h3>
                        
                        <div className="space-y-3">
                            <button 
                                onClick={() => shareToSocial('whatsapp', activeShareVideo)}
                                className="w-full flex items-center gap-4 p-4 rounded-lg bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all group font-bold"
                            >
                                <MessageCircle size={20} />
                                <span>WhatsApp</span>
                            </button>
                            
                            <button 
                                onClick={() => shareToSocial('twitter', activeShareVideo)}
                                className="w-full flex items-center gap-4 p-4 rounded-lg bg-neutral-800 text-white border border-white/10 hover:bg-white hover:text-black transition-all group font-bold"
                            >
                                <Twitter size={20} />
                                <span>Twitter / X</span>
                            </button>
                            
                            <button 
                                onClick={() => shareToSocial('facebook', activeShareVideo)}
                                className="w-full flex items-center gap-4 p-4 rounded-lg bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/20 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all group font-bold"
                            >
                                <Facebook size={20} />
                                <span>Facebook</span>
                            </button>
                            
                            <div className="h-px bg-white/10 my-4"></div>
                            
                            <button 
                                onClick={() => copyToClipboard(activeShareVideo)}
                                className="w-full flex items-center justify-between gap-4 p-4 rounded-lg bg-neutral-900 text-gray-300 border border-white/10 hover:border-white/30 hover:text-white transition-all font-bold"
                            >
                                <div className="flex items-center gap-4">
                                    <LinkIcon size={20} />
                                    <span>Copiar Link</span>
                                </div>
                                {copiedId === activeShareVideo.id && (
                                    <span className="text-green-500 text-xs uppercase tracking-wider flex items-center gap-1">
                                        <Check size={14} /> Copiado
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LatestVideos;