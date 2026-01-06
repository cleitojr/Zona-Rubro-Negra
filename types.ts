export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  timeAgo: string;
  isLive?: boolean;
  link?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  coupon: string;
  link: string;
}

export interface NavItem {
  label: string;
  href: string;
}