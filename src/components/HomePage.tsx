'use client';

import { motion, Variants } from 'framer-motion';
import { getAllScenes } from '@/data/scenes';
import { SceneCard } from './SceneCard';
import { Navigation } from './Navigation';
import { Sparkles, Music, ArrowRight } from 'lucide-react';

export function HomePage() {
  const scenes = getAllScenes();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Background Gradient Orbs - Subtle */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-300/10 via-pink-300/10 to-transparent rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-300/10 via-cyan-300/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">
                  Discover Music Scenes
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Every Moment
                  </span>
                  <br />
                  <span className="text-gray-900">Has a Song</span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-600 max-w-xl leading-relaxed"
              >
                Experience music through different life scenes. From the kitchen
                to the shaadi, each moment has its own perfect soundtrack.
              </motion.p>

              {/* Hindi Tagline */}
              <motion.p
                variants={itemVariants}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.4 }}
                className="text-lg font-semibold text-purple-600"
              >
                Har scene ka ek gaana hota hai. 🎵
              </motion.p>

              {/* CTA Button */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.5 }}
              >
                <a href="#scenes">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(147, 51, 234, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg transition-all shadow-lg"
                  >
                    Explore Scenes
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.6 }}
                className="flex gap-8 pt-8 border-t border-gray-200"
              >
                <div>
                  <div className="text-3xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-600">Unique Scenes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">100+</div>
                  <div className="text-sm text-gray-600">Songs Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">Live</div>
                  <div className="text-sm text-gray-600">Now Streaming</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Large Emoji */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400 to-pink-400 blur-2xl opacity-30" />

                {/* Card */}
                <div className="relative rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 p-12 shadow-2xl border border-purple-200/50">
                  <div className="text-9xl">🎵</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scenes Section */}
        <div id="scenes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Explore Scenes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pick a scene and immerse yourself in curated music for every moment
            </p>
          </motion.div>

          {/* Scenes Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {scenes.map((scene, index) => (
              <SceneCard key={scene.id} scene={scene} delay={index * 0.05} />
            ))}
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-br from-gray-50 to-purple-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Why SUNO.WTF?
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: '🎧',
                  title: 'Curated Playlists',
                  description: 'Hand-picked songs for every scene and mood',
                },
                {
                  icon: '🌍',
                  title: 'Live Community',
                  description: 'See who else is listening right now',
                },
                {
                  icon: '✨',
                  title: 'Perfect Timing',
                  description: 'Every moment deserves the perfect soundtrack',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="rounded-2xl bg-white p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 py-12"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Made for people who need a song</p>
              <motion.p
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="text-gray-400 text-sm"
              >
                ✨ Every moment, every scene, every song ✨
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
