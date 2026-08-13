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
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8 pt-24 pb-32">
        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6 drop-shadow-lg"
          >
            {scene.emoji}
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-black mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              background: `linear-gradient(135deg, ${scene.atmosphere.accentColor}, #000)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {scene.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-semibold uppercase tracking-widest mb-4"
            style={{ color: scene.atmosphere.accentColor }}
          >
            {scene.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3"
          >
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: scene.atmosphere.accentColor }}
            />
            <span
              className="text-sm font-bold uppercase tracking-wide"
              style={{ color: scene.atmosphere.accentColor }}
            >
              {presenceCount} {scene.activeText}
            </span>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player Section - Main */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div
              className="rounded-3xl p-8 shadow-2xl backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))`,
                border: `2px solid ${scene.atmosphere.accentColor}20`,
              }}
            >
              <MusicPlayer
                playlist={scene.playlist}
                accentColor={scene.atmosphere.accentColor}
                youtubePlaylistId={scene.youtubePlaylistId || ''}
              />
            </div>
          </motion.div>

          {/* Sidebar - Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6"
          >
            <div
              className="rounded-3xl p-6 shadow-lg backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))`,
                border: `2px solid ${scene.atmosphere.accentColor}20`,
              }}
            >
              <motion.h3
                className="text-lg font-bold mb-4 uppercase tracking-wider"
                style={{ color: scene.atmosphere.accentColor }}
              >
                Activity
              </motion.h3>
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
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8"
        >
          <div
            className="rounded-3xl p-8 shadow-lg backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))`,
              border: `2px solid ${scene.atmosphere.accentColor}20`,
            }}
          >
            <motion.h3
              className="text-2xl font-bold mb-6 uppercase tracking-wider"
              style={{ color: scene.atmosphere.accentColor }}
            >
              Queue
            </motion.h3>
            <Playlist
              tracks={scene.playlist}
              accentColor={scene.atmosphere.accentColor}
            />
          </div>
        </motion.div>

        {/* Background Gradient Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${scene.atmosphere.accentColor}, transparent)`,
            }}
          />
          <motion.div
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${scene.atmosphere.accentColor}, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
