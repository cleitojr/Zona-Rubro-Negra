import React from 'react';
import { Youtube, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020202] py-16 border-t border-white/5 text-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt="ZRN Logo" 
                className="w-10 h-10 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-900/50" 
              />
              <span className="text-white font-extrabold tracking-wider text-lg">ZONA RUBRO-NEGRA</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              O canal feito 100% de rubro-negros para rubro-negros. Notícias, opinião e a melhor resenha do Mengão.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">Conteúdo</h4>
            <ul className="space-y-2">
              {['Últimos Vídeos', 'Lives', 'Shorts', 'Comunidade'].map(item => (
                <li key={item}><a href="#" className="text-gray-500 hover:text-red-500 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1">
            <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">Social</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-500 hover:text-red-500 cursor-pointer transition-colors"><Youtube size={14}/> YouTube</li>
              <li className="flex items-center gap-2 text-gray-500 hover:text-red-500 cursor-pointer transition-colors"><Instagram size={14}/> Instagram</li>
              <li className="flex items-center gap-2 text-gray-500 hover:text-red-500 cursor-pointer transition-colors"><Twitter size={14}/> Discord</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
             <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">Contato</h4>
             <button className="bg-white text-black w-full py-2 rounded text-xs font-bold uppercase hover:bg-gray-200 transition-colors mb-2">
                Fale Conosco via WhatsApp
             </button>
             <p className="text-[10px] text-gray-600">Para parcerias e publicidade: contato@zonarubronegra.com.br</p>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600">
          <p>© 2024 Zona Rubro Negra. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Termos de Uso</a>
            <a href="#" className="hover:text-white">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;