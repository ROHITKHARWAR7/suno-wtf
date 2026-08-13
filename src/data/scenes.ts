// Complete scenes.ts file with Bhojpuri properly integrated

import { Scene } from '@/types';

// All scenes configuration
export const SCENES: Record<
  string,
  Scene & {
    youtubePlaylistId?: string;
    bhojpuriQuotes?: string[];
  }
> = {
  kitchen: {
    id: 'kitchen',
    slug: 'kitchen',
    name: 'Kitchen',
    emoji: '🍳',
    description: 'Late-night cooking sessions',
    activeText: 'COOKING RIGHT NOW',
    statusText: 'Join the kitchen',

    // Kitchen YouTube playlist
    youtubePlaylistId: 'PLPr-XuFuXX3I',

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

    // Songs come directly from YouTube
    playlist: [],
  },

  majdoor: {
    id: 'majdoor',
    slug: 'majdoor',
    name: 'Dihadi Majdoor',
    emoji: '🔨',
    description: 'Hard work, harder beats',
    activeText: 'WORKING RIGHT NOW',
    statusText: 'Join the grind',

    // Majdoor YouTube playlist
    youtubePlaylistId: 'PLZysXNxsYg_0',

    theme: {
      primary: '#2C3E50',
      secondary: '#34495E',
      accent: '#E74C3C',
      background: '#ECF0F1',
      text: '#2C3E50',
      muted: '#7F8C8D',
    },

    atmosphere: {
      primaryColor: '#2C3E50',
      accentColor: '#E74C3C',
      gradientStart: '#ECF0F1',
      gradientEnd: '#BDC3C7',
      particles: true,
    },

    // Songs come directly from YouTube
    playlist: [],
  },

  saloon: {
    id: 'saloon',
    slug: 'saloon',
    name: 'Saloon',
    emoji: '💈',
    description: 'Chill vibes and good grooming',
    activeText: 'GETTING FRESH NOW',
    statusText: 'Join the saloon',

    // Updated Saloon YouTube playlist
    youtubePlaylistId: 'PLQM6BDQ8SS1A',

    theme: {
      primary: '#1A1A1A',
      secondary: '#333333',
      accent: '#FFB800',
      background: '#F5F5F5',
      text: '#1A1A1A',
      muted: '#999999',
    },

    atmosphere: {
      primaryColor: '#1A1A1A',
      accentColor: '#FFB800',
      gradientStart: '#F5F5F5',
      gradientEnd: '#E0E0E0',
      particles: true,
    },

    // Songs come directly from YouTube
    playlist: [],
  },

  shaadi: {
    id: 'shaadi',
    slug: 'shaadi',
    name: 'Shaadi',
    emoji: '💍',
    description: 'Wedding celebrations and romance',
    activeText: 'CELEBRATING NOW',
    statusText: 'Join the wedding',

    // Shaadi YouTube playlist
    youtubePlaylistId: 'PLEwG0PgoYma4',

    theme: {
      primary: '#C70039',
      secondary: '#FF5733',
      accent: '#FFC300',
      background: '#FFF9E6',
      text: '#8B0000',
      muted: '#FF6B6B',
    },

    atmosphere: {
      primaryColor: '#C70039',
      accentColor: '#FFC300',
      gradientStart: '#FFF9E6',
      gradientEnd: '#FFE6E6',
      particles: true,
    },

    // Songs come directly from YouTube
    playlist: [],
  },

  breakup: {
    id: 'breakup',
    slug: 'breakup',
    name: 'Breakup',
    emoji: '💔',
    description: 'Heartbreak and healing songs',
    activeText: 'HEALING NOW',
    statusText: 'Join the healing',

    // Breakup YouTube playlist
    youtubePlaylistId: 'PLWN9Lxvnbb-0',

    theme: {
      primary: '#2C3E50',
      secondary: '#34495E',
      accent: '#E67E22',
      background: '#ECF0F1',
      text: '#2C3E50',
      muted: '#95A5A6',
    },

    atmosphere: {
      primaryColor: '#2C3E50',
      accentColor: '#E67E22',
      gradientStart: '#ECF0F1',
      gradientEnd: '#D5DBDB',
      particles: true,
    },

    // Songs come directly from YouTube
    playlist: [],
  },

  bhojpuri: {
    id: 'bhojpuri',
    slug: 'bhojpuri',
    name: 'Bhojpuri Banger',
    emoji: '🎬',
    description: 'Depression ki dawa hove bhojpuri gana',
    activeText: 'LISTENING NOW',
    statusText: 'Join the banger',

    // Bhojpuri YouTube playlist
    youtubePlaylistId: 'PLcex0xtT6_Gs',

    theme: {
      primary: '#8B4513',
      secondary: '#D2691E',
      accent: '#FF6B35',
      background: '#FFF8DC',
      text: '#2C1810',
      muted: '#A0826D',
    },

    atmosphere: {
      primaryColor: '#8B4513',
      accentColor: '#FF6B35',
      gradientStart: '#FFF8DC',
      gradientEnd: '#FFE4B5',
      particles: true,
    },

    // Songs come directly from YouTube
    playlist: [],

    bhojpuriQuotes: [
      'Depression ki dawa hove bhojpuri gana 💔',
      'Dil se Bhojpuri, Jaan se Bhojpuri 🎵',
      'Prem Kahani, Bhojpuri Zubani 💕',
      'Gawat ke dard, Bhojpuri gana se kam',
      'Jab dil bhare, Bhojpuri sune 🎶',
      'Bhojpuri gana, Dil ka Ilaaj',
      'Pyaar ki bhasya, Bhojpuri Bhasha',
      'Khushi ka Code, Bhojpuri Mode 🔥',
      'Dukh-sukh sab, Bhojpuri mein',
      'Jeevan ka Raag, Bhojpuri Swag',
      'Bhaiya, Bhojpuri gana suno 🎤',
      'Heart teri, Bhojpuri meri',
    ],
  },
};

// Order of scenes to display
export const SCENE_ORDER: Array<keyof typeof SCENES> = [
  'kitchen',
  'majdoor',
  'saloon',
  'shaadi',
  'breakup',
  'bhojpuri',
];

// Get all scenes in order
export function getAllScenes() {
  return SCENE_ORDER
    .map((sceneId) => SCENES[sceneId])
    .filter(Boolean);
}

// Get a specific scene by slug
export function getScene(slug: string) {
  return Object.values(SCENES).find(
    (scene) => scene.slug === slug
  );
}