'use client';

import { motion } from 'framer-motion';
import { getAllScenes } from '@/data/scenes';
import { SceneCard } from './SceneCard';
import { Sparkles, Music } from 'lucide-react';

export function HomePage() {
  const scenes = getAllScenes();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-900 to-slate-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-pink-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-linear-to-br from-cyan-500/20 via-blue-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-32">
          {/* Icon Animation */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-75"
              />
              <div className="relative bg-linear-to-br from-slate-900 to-slate-800 p-6 rounded-full">
                <Music className="w-16 h-16 text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500" />
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 max-w-4xl"
          >
            <motion.h1
              className="text-7xl md:text-8xl font-black mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                SUNO
              </span>
              <span className="text-white">.WTF</span>
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-300 via-purple-300 to-cyan-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Har scene ka ek gaana hota hai.
            </motion.p>

            <motion.div
              className="h-1 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-gray-300 mb-8 max-w-2xl text-center leading-relaxed"
          >
            Experience music through different scenes. Every moment has its own soundtrack.
            <br />
            Enter a world where atmosphere meets melody.
          </motion.p>

          {/* CTA Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center gap-2 text-sm uppercase tracking-widest text-purple-400 font-semibold mb-16"
          >
            <Sparkles className="w-4 h-4" />
            Choose your scene
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Scenes Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {scenes.map((scene, index) => (
              <SceneCard key={scene.id} scene={scene} delay={index * 0.05} />
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center py-16 border-t border-purple-500/20"
        >
          <p className="text-gray-400 text-sm mb-2">Made for people who need a song.</p>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-gray-600 text-xs"
          >
            ✨ Explore the scenes ✨
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
