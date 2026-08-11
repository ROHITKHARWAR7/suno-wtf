'use client';

import { motion } from 'framer-motion';
import { getAllScenes } from '@/data/scenes';
import { SceneCard } from './SceneCard';

export function HomePage() {
  const scenes = getAllScenes();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-20 md:py-32 text-center">
        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            SUNO.WTF
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
            Har scene ka ek gaana hota hai.
          </p>
          <div className="h-1 w-16 bg-black mx-auto rounded-full" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 mb-16 max-w-xl mx-auto"
        >
          Every scene has its own music. Every moment has its own atmosphere. Enter a room.
        </motion.p>

        {/* CTA Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-12"
        >
          What's your scene?
        </motion.p>
      </div>

      {/* Scenes Grid */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
        transition={{ delay: 0.8 }}
        className="text-center py-12 text-sm text-gray-600 border-t"
      >
        <p>Made for people who need a song.</p>
      </motion.div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-30"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-100 to-transparent rounded-full opacity-30"
        />
      </div>
    </div>
  );
}
