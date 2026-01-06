import React from 'react';

const NotificationBar: React.FC = () => {
  return (
    <div className="bg-red-600 text-white overflow-hidden py-3 relative flex items-center shadow-lg z-20">
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-red-600 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-red-600 to-transparent z-10"></div>
      
      <div className="container mx-auto flex justify-center items-center px-4 relative z-20">
        <div className="flex gap-4 md:gap-12 text-xs md:text-sm font-bold uppercase tracking-wider opacity-90 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <span>Pré-Jogo</span>
            <span className="text-red-300">•</span>
            <span>Pós-Jogo</span>
            <span className="text-red-300">•</span>
            <span>Bate-papo</span>
            <span className="text-red-300">•</span>
            <span>Ao Vivo</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;