export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  src?: string;
}

export interface SceneTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
}

export interface SceneAtmosphere {
  primaryColor: string;
  accentColor: string;
  gradientStart: string;
  gradientEnd: string;
  particles: boolean;
}

export interface Scene {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  description: string;
  activeText: string;
  statusText: string;
  theme: SceneTheme;
  atmosphere: SceneAtmosphere;

  // YouTube playlist for this scene
  youtubePlaylistId: string;

  playlist: Track[];
}

export interface Activity {
  id: string;
  type: string;
  message: string;
  timestamp?: number;
}