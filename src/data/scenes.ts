import { Scene } from '@/types';

export const SCENES: Record<string, Scene> = {
  kitchen: {
    id: 'kitchen',
    slug: 'kitchen',
    name: 'Kitchen',
    emoji: '🍳',
    description: 'Late-night cooking sessions',
    activeText: 'COOKING RIGHT NOW',
    statusText: 'Join the kitchen',

    theme: {
      primary: '#F5E6D3',
      secondary: '#D4A574',
      accent: '#E8794B',
      background: '#FBF7F2',
      text: '#2D2D2D',
      muted: '#A89A88',
    },

    atmosphere: {
      primaryColor: '#F5E6D3',
      accentColor: '#E8794B',
      gradientStart: '#FBF7F2',
      gradientEnd: '#F5E6D3',
      particles: true,
    },

    // Kitchen YouTube playlist
    youtubePlaylistId: 'PLPr-XuFuXX3I',

    // Songs come directly from YouTube
    playlist: [],
  },

  majdoor: {
    id: 'majdoor',
    slug: 'majdoor',
    name: 'Majdoor',
    emoji: '🔨',
    description: 'Working hands, building dreams',
    activeText: 'WORKING RIGHT NOW',
    statusText: 'Join the work',

    theme: {
      primary: '#E8E8E8',
      secondary: '#8B7D6B',
      accent: '#A0744D',
      background: '#F5F5F5',
      text: '#2D2D2D',
      muted: '#9B9B9B',
    },

    atmosphere: {
      primaryColor: '#E8E8E8',
      accentColor: '#A0744D',
      gradientStart: '#F5F5F5',
      gradientEnd: '#E8E8E8',
      particles: true,
    },

    // Majdoor YouTube playlist
    youtubePlaylistId: 'PLZysXNxsYg_0',

    // Songs come directly from YouTube
    playlist: [],
  },

  saloon: {
    id: 'saloon',
    slug: 'saloon',
    name: 'Saloon',
    emoji: '💈',
    description: 'Mirrors and fresh cuts',
    activeText: 'GETTING READY RIGHT NOW',
    statusText: 'Join the saloon',

    theme: {
      primary: '#2D5A52',
      secondary: '#4A8F7B',
      accent: '#E8D5B7',
      background: '#F0F3F1',
      text: '#2D2D2D',
      muted: '#708B85',
    },

    atmosphere: {
      primaryColor: '#2D5A52',
      accentColor: '#E8D5B7',
      gradientStart: '#F0F3F1',
      gradientEnd: '#2D5A52',
      particles: false,
    },

    // Saloon YouTube playlist
    youtubePlaylistId: 'PLQM6BDQ8SS1A',

    // Songs come directly from YouTube
    playlist: [],
  },

  shaadi: {
    id: 'shaadi',
    slug: 'shaadi',
    name: 'Shaadi',
    emoji: '💍',
    description: 'Celebrations and new beginnings',
    activeText: 'CELEBRATING RIGHT NOW',
    statusText: 'Join the celebration',

    theme: {
      primary: '#8B1A1A',
      secondary: '#D4AF37',
      accent: '#FFE4E1',
      background: '#FFF8F0',
      text: '#2D2D2D',
      muted: '#C4A574',
    },

    atmosphere: {
      primaryColor: '#8B1A1A',
      accentColor: '#D4AF37',
      gradientStart: '#FFF8F0',
      gradientEnd: '#8B1A1A',
      particles: true,
    },

    // Shaadi YouTube playlist
    youtubePlaylistId: 'PLEwG0PgoYma4',

    // Songs come directly from YouTube
    playlist: [],
  },

  breakup: {
    id: 'breakup',
    slug: 'breakup',
    name: 'Breakup',
    emoji: '💔',
    description: 'Songs that hurt',
    activeText: 'HEALING RIGHT NOW',
    statusText: 'Join the midnight',

    theme: {
      primary: '#1A1A2E',
      secondary: '#16213E',
      accent: '#C1121F',
      background: '#0F3460',
      text: '#E5E5E5',
      muted: '#8B8B8B',
    },

    atmosphere: {
      primaryColor: '#1A1A2E',
      accentColor: '#C1121F',
      gradientStart: '#0F3460',
      gradientEnd: '#1A1A2E',
      particles: false,
    },

    // Breakup YouTube playlist
    youtubePlaylistId: 'PLWN9Lxvnbb-0',

    // Songs come directly from YouTube
    playlist: [],
  },
};

export const SCENE_ORDER = [
  'kitchen',
  'majdoor',
  'saloon',
  'shaadi',
  'breakup',
];

export function getScene(slug: string): Scene | null {
  return SCENES[slug] || null;
}

export function getAllScenes(): Scene[] {
  return SCENE_ORDER.map((slug) => SCENES[slug]);
}