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

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone?: string | null;
  role: 'admin' | 'member' | 'user';
  membership_tier: 'free' | 'bronze' | 'prata' | 'ouro' | 'diamante';
  youtube_connected: boolean;
  youtube_channel?: string;
  avatar_url?: string;
  created_at?: string;
}