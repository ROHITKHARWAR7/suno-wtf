'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { SCENE_ORDER, SCENES } from '@/data/scenes';

export function Navigation() {
  const pathname = usePathname();
  const currentScene = pathname.split('/')[1] || '';

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/30 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex-shrink-0 flex items-center gap-3 font-bold text-lg"
          >
            <motion.span
              className="text-2xl"
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              🎵
            </motion.span>
            <span className="hidden sm:inline bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-black">
              SUNO
            </span>
          </Link>

          {/* Desktop Tabs */}
          <div className="hidden md:flex items-center gap-1">
            {/* Home Tab */}
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  currentScene === ''
                    ? 'bg-gray-100 text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Home
              </motion.button>
            </Link>

            {/* Scene Tabs */}
            {SCENE_ORDER.map((sceneId) => {
              const scene = SCENES[sceneId];
              const isActive = currentScene === sceneId;

              return (
                <Link key={sceneId} href={`/${sceneId}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-gray-900 shadow-sm border border-purple-200/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-base">{scene.emoji}</span>
                    <span className="hidden lg:inline">{scene.name}</span>
                  </motion.button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu - Scene Dropdown */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  currentScene === ''
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Home
              </motion.button>
            </Link>

            {/* Mobile Scene Icons */}
            <div className="flex gap-1">
              {SCENE_ORDER.map((sceneId) => {
                const scene = SCENES[sceneId];
                const isActive = currentScene === sceneId;

                return (
                  <Link key={sceneId} href={`/${sceneId}`}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-lg text-base transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-100 to-pink-100 shadow-sm'
                          : 'hover:bg-gray-50'
                      }`}
                      title={scene.name}
                    >
                      {scene.emoji}
                    </motion.button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
