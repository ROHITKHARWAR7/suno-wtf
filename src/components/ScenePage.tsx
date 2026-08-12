'use client';

import { motion } from 'framer-motion';
import { Scene } from '@/types';
import { MusicPlayer } from './MusicPlayer';
import { Playlist } from './Playlist';
import { ActivityFeed } from './ActivityFeed';
import { usePresenceCount } from '@/hooks/usePresenceCount';
import { Navigation } from './Navigation';

interface ScenePageProps {
  scene: Scene & { youtubePlaylistId?: string };
}

export function ScenePage({ scene }: ScenePageProps) {
  const presenceCount = usePresenceCount(scene.id);

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        background: `linear-gradient(135deg, ${scene.atmosphere.gradientStart} 0%, ${scene.atmosphere.gradientEnd} 100%)`,
      }}
    >
      <Navigation currentScene={scene.slug} />

      <div className="max-w-2xl mx-auto px-4 py-8 pt-24 pb-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">{scene.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{scene.name}</h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-semibold uppercase tracking-wide"
            style={{ color: scene.atmosphere.accentColor }}
          >
            {presenceCount} {scene.activeText}
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <MusicPlayer
                playlist={scene.playlist}
                accentColor={scene.atmosphere.accentColor}
                youtubePlaylistId={scene.youtubePlaylistId || ''}
              />
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Activity Feed */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <ActivityFeed
                sceneId={scene.id}
                accentColor={scene.atmosphere.accentColor}
              />
            </div>
          </motion.div>
        </div>

        {/* Playlist Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
        >
          <Playlist
            tracks={scene.playlist}
            accentColor={scene.atmosphere.accentColor}
          />
        </motion.div>

        {/* Atmospheric Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center text-sm opacity-70"
        >
          <p>{scene.description}</p>
        </motion.div>
      </div>

      {/* Background Noise Effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5 mix-blend-multiply"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" /></filter><rect width="100" height="100" fill="black" filter="url(%23noise)" /></svg>')`,
        }}
      />
    </div>
  );
}