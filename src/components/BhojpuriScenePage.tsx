'use client';

import { motion } from 'framer-motion';
import { MusicPlayer } from './MusicPlayer';
import { Playlist } from './Playlist';
import { ActivityFeed } from './ActivityFeed';
import { usePresenceCount } from '@/hooks/usePresenceCount';
import { Navigation } from './Navigation';
import { Heart, Music } from 'lucide-react';
import type { Scene } from '@/types';

interface BhojpuriScenePageProps {
  scene: Scene & {
    youtubePlaylistId?: string;
    bhojpuriQuotes?: string[];
  };
}

export function BhojpuriScenePage({
  scene,
}: BhojpuriScenePageProps) {
  const presenceCount = usePresenceCount(scene.id);

  // Bhojpuri quotes
  const quotes: string[] = scene.bhojpuriQuotes ?? [];

  // Generate multiple quote tracks for continuous animation
  const quoteRows: string[][] = Array.from(
    { length: 3 },
    (_, i) => quotes.slice(i * 4, i * 4 + 4)
  );

  return (
    <div
      className="min-h-screen transition-colors duration-500 overflow-hidden relative"
      style={{
        background: `linear-gradient(
          135deg,
          ${scene.atmosphere.gradientStart} 0%,
          ${scene.atmosphere.gradientEnd} 100%
        )`,
      }}
    >
      <Navigation />

      {/* Animated Background Quotes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {quoteRows.map(
          (rowQuotes: string[], rowIndex: number) => (
            <div
              key={rowIndex}
              className="absolute w-full"
              style={{
                top: `${20 + rowIndex * 30}%`,
                opacity: 0.1,
              }}
            >
              <motion.div
                animate={{
                  x: ['0%', '-100%'],
                }}
                transition={{
                  duration: 30 + rowIndex * 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="whitespace-nowrap flex gap-8"
              >
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex gap-8"
                  >
                    {rowQuotes.map(
                      (quote: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-4xl font-black"
                          style={{
                            color:
                              scene.atmosphere.accentColor,
                            textShadow:
                              '2px 2px 4px rgba(0,0,0,0.1)',
                          }}
                        >
                          {quote}
                        </span>
                      )
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          )
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8 pt-24 pb-32">

          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Animated Emoji Celebration */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-6xl"
              >
                🎬
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="text-5xl"
              >
                🎤
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-5xl"
              >
                💔
              </motion.div>
            </div>

            {/* Main Title */}
            <motion.h1
              className="text-6xl md:text-7xl font-black mb-4 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                background: `linear-gradient(
                  135deg,
                  ${scene.atmosphere.accentColor},
                  #8B4513
                )`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {scene.name}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-2xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                color: scene.atmosphere.accentColor,
              }}
            >
              "{scene.description}"
            </motion.p>

            {/* Bhojpuri Actors Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-6 mb-8 flex-wrap"
            >
              <div
                className="text-sm font-bold"
                style={{
                  color: scene.theme.text,
                }}
              >
                Featured: Pawan Singh | Khesari Lal | Dinesh Lal |
                Ritesh Pandey | Rani Chatterjee
              </div>
            </motion.div>

            {/* Live Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-3"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <Heart
                  className="w-5 h-5"
                  style={{
                    color: scene.atmosphere.accentColor,
                  }}
                />
              </motion.div>

              <span
                className="text-lg font-bold uppercase tracking-wide"
                style={{
                  color: scene.atmosphere.accentColor,
                }}
              >
                {presenceCount} {scene.activeText}
              </span>
            </motion.div>
          </motion.div>

          {/* Bhojpuri Quotes Display Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12 p-8 rounded-3xl backdrop-blur-sm"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))',
              border: `3px solid ${scene.atmosphere.accentColor}`,
            }}
          >
            <div className="text-center">
              <Music
                className="w-8 h-8 mx-auto mb-4"
                style={{
                  color: scene.atmosphere.accentColor,
                }}
              />

              <motion.p
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="text-2xl font-black mb-4"
                style={{
                  color: scene.theme.text,
                }}
              >
                🎵 Bhojpuri Vibes On Point 🎵
              </motion.p>

              <p
                className="text-lg"
                style={{
                  color: scene.theme.text,
                }}
              >
                "Har scene ka ek gaana, Bhojpuri mein prem aur duniya
                ka fasaana"
              </p>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Player Section */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.1,
                duration: 0.5,
              }}
              className="lg:col-span-2"
            >
              <div
                className="rounded-3xl p-8 shadow-2xl backdrop-blur-sm"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                  border: `2px solid ${scene.atmosphere.accentColor}20`,
                }}
              >
                <MusicPlayer
                  playlist={scene.playlist}
                  accentColor={scene.atmosphere.accentColor}
                  youtubePlaylistId={
                    scene.youtubePlaylistId || ''
                  }
                />
              </div>
            </motion.div>

            {/* Sidebar - Activity Feed */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.5,
              }}
              className="space-y-6"
            >
              {/* Live Activity */}
              <div
                className="rounded-3xl p-6 shadow-lg backdrop-blur-sm"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                  border: `2px solid ${scene.atmosphere.accentColor}20`,
                }}
              >
                <motion.h3
                  className="text-lg font-bold mb-4 uppercase tracking-wider"
                  style={{
                    color: scene.atmosphere.accentColor,
                  }}
                >
                  🎬 Live Now
                </motion.h3>

                <ActivityFeed
                  sceneId={scene.id}
                  accentColor={scene.atmosphere.accentColor}
                />
              </div>

              {/* Bhojpuri Tagline Card */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.4,
                }}
                className="rounded-3xl p-6 shadow-lg backdrop-blur-sm"
                style={{
                  background: `linear-gradient(
                    135deg,
                    ${scene.atmosphere.accentColor}20,
                    ${scene.atmosphere.accentColor}10
                  )`,
                  border: `2px solid ${scene.atmosphere.accentColor}40`,
                }}
              >
                <p
                  className="text-center text-sm font-bold leading-relaxed"
                  style={{
                    color: scene.theme.text,
                  }}
                >
                  💔 "Dukh bhare dil ka dawa, Bhojpuri gana se hi ata hai"
                </p>

                <p
                  className="text-center text-xs mt-4 opacity-70"
                  style={{
                    color: scene.theme.text,
                  }}
                >
                  -Rohit : A Bhojpuri Lover's Truth
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Playlist Section */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.5,
            }}
            className="mt-8"
          >
            <div
              className="rounded-3xl p-8 shadow-lg backdrop-blur-sm"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                border: `2px solid ${scene.atmosphere.accentColor}20`,
              }}
            >
              <motion.h3
                className="text-2xl font-bold mb-6 uppercase tracking-wider"
                style={{
                  color: scene.atmosphere.accentColor,
                }}
              >
                🎵 Bhojpuri Queue
              </motion.h3>

              <Playlist
                tracks={scene.playlist}
                accentColor={scene.atmosphere.accentColor}
              />
            </div>
          </motion.div>

          {/* Bottom Bhojpuri Quote */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.5,
            }}
            className="mt-12 text-center"
          >
            <motion.p
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="text-xl font-black italic"
              style={{
                color: scene.atmosphere.accentColor,
              }}
            >
              "Bhojpuri bhasha, Bhojpuri gana, Bhojpuri sab kuch Mahan!" 🎭
            </motion.p>
          </motion.div>
        </div>

        {/* Animated Accent Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
            }}
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{
              background: `radial-gradient(
                circle,
                ${scene.atmosphere.accentColor},
                transparent
              )`,
            }}
          />

          <motion.div
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
            }}
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{
              background: `radial-gradient(
                circle,
                ${scene.atmosphere.accentColor},
                transparent
              )`,
            }}
          />
        </div>
      </div>
    </div>
  );
}