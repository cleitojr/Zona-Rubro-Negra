import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogIn, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import LeadModal from './LeadModal';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo Area */}
          <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-full border-2 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)] overflow-hidden bg-black flex items-center justify-center"
                  >
                      <img 
                        src="/logo.png" 
                        alt="ZRN Logo" 
                        className="w-full h-full object-cover"
                      />
                  </motion.div>
                  <span className="text-white font-extrabold tracking-wider hidden sm:block text-lg whitespace-nowrap drop-shadow-md">
                    ZONA RUBRO-NEGRA
                  </span>
              </div>
              
              {/* Blinking Live Indicator */}
              <div className="hidden lg:flex items-center gap-1.5 bg-red-600/10 border border-red-600/30 px-2 py-1 rounded-full animate-pulse">
                  <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                  </span>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Ao Vivo</span>
              </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-gray-300 hover:text-white text-xs font-bold tracking-widest transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side: Socials + CTA Button */}
          <div className="hidden md:flex items-center gap-5">
            {/* Social Icons */}
            <div className="flex items-center gap-4 border-r border-white/10 pr-5 h-6">
                <a href="https://instagram.com/zonarubronegra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors transform hover:scale-110" title="Instagram">
                    <Instagram size={18} />
                </a>
                <a href="https://x.com/zonarubronegra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1DA1F2] transition-colors transform hover:scale-110" title="Twitter / X">
                    <Twitter size={18} />
                </a>
                <a href="https://discord.gg/8k3aXxSbkE" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5865F2] transition-colors transform hover:scale-110" title="Discord">
                    <MessageCircle size={18} />
                </a>
            </div>

            {/* Member Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-neutral-900 border border-white/20 hover:border-red-600 text-white px-5 py-2 rounded text-xs font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-red-900/20"
            >
              <User size={16} className="text-red-600" />
              ÁREA DO MEMBRO
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden text-white">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 absolute top-full left-0 w-full border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                {NAV_ITEMS.map((item) => (
                  <a 
                    key={item.label} 
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-white font-bold cursor-pointer text-lg tracking-wider hover:text-red-500 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                
                {/* Mobile Socials */}
                <div className="flex items-center gap-8 py-4 border-y border-white/10 justify-center">
                   <a href="https://instagram.com/zonarubronegra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2"><Instagram size={24} /></a>
                   <a href="https://x.com/zonarubronegra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2"><Twitter size={24} /></a>
                   <a href="https://discord.gg/8k3aXxSbkE" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2"><MessageCircle size={24} /></a>
                </div>

                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="bg-neutral-900 border border-red-600 text-white px-5 py-4 rounded-lg text-sm font-bold w-full uppercase flex items-center justify-center gap-2 active:bg-red-900/20 transition-colors"
                >
                  <LogIn size={18} />
                  Área do Membro
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;