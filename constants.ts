import { Video, TeamMember, Partner, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'INÍCIO', href: '#home' },
  { label: 'VÍDEOS', href: '#videos' },
  { label: 'EQUIPE', href: '#team' },
  { label: 'PARCEIROS', href: '#partners' },
];

export const LATEST_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'ANÁLISE: O QUE ESPERAR DO PRÓXIMO CONFRONTO NO...',
    thumbnail: 'https://picsum.photos/seed/video1/400/225',
    views: '15 mil views',
    timeAgo: 'Há 5 horas',
    link: 'https://youtube.com/@ZonaRubronegra'
  },
  {
    id: '2',
    title: 'BASTIDORES: COMO FOI A PREPARAÇÃO PARA A FINAL',
    thumbnail: 'https://picsum.photos/seed/video2/400/225',
    views: '22 mil views',
    timeAgo: 'Há 8 horas',
    link: 'https://youtube.com/@ZonaRubronegra'
  },
  {
    id: '3',
    title: 'MERCADO DA BOLA: QUEM CHEGA E QUEM SAI?',
    thumbnail: 'https://picsum.photos/seed/video3/400/225',
    views: '45 mil views',
    timeAgo: 'Há 1 dia',
    link: 'https://youtube.com/@ZonaRubronegra'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'ARTHUR COSTA', role: 'APRESENTADOR & COMENTARISTA', image: '/arthur.png' },
  { id: '2', name: 'CLEITO JR', role: 'APRESENTADOR & COMENTARISTA', image: '/cleito.png' },
  { id: '3', name: 'RODRIGO FERREIRA', role: 'NARRADOR & COMENTARISTA', image: '/rodrigo.png' },
  { id: '4', name: 'RAFAEL SMITH', role: 'COMENTARISTA', image: '/rafael.png' },
  { id: '5', name: 'RENAN LOPES', role: 'COMENTARISTA', image: '/renan.png' },
];

export const PARTNERS: Partner[] = [
  { 
    id: '1', 
    name: 'CENTAURO', 
    description: 'Ganhe 10% de desconto em produtos vendidos e entregues pela Centauro.', 
    coupon: 'ZRN10',
    link: 'https://click.centauro.com.br/13Nl/2cfgu4pm' 
  },
  { 
    id: '2', 
    name: 'GOCASE', 
    description: 'Garanta um desconto exclusivo em compras acima de R$99!', 
    coupon: 'ZONARUBRONEGRA',
    link: 'https://www.gocase.com.br' 
  },
  { 
    id: '3', 
    name: 'MANUAL', 
    description: 'Ganhe 40% de desconto + frete grátis na sua primeira compra utilizando o cupom.', 
    coupon: 'ZONARUBRONEGRA',
    link: 'https://www.manual.com.br' 
  },
];