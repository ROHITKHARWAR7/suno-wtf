'use client';

import { motion } from 'framer-motion';
import { Scene } from '@/types';
import Link from 'next/link';
import { usePresenceCount } from '@/hooks/usePresenceCount';
import { ChevronRight, Zap } from 'lucide-react';

interface SceneCardProps {
  scene: Scene;
  delay?: number;
}

export function SceneCard({ scene, delay = 0 }: SceneCardProps) {
  const presenceCount = usePresenceCount(scene.id);

  return (
    <Link href={`/${scene.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        whileHover={{ y: -8 }}
        className="group cursor-pointer h-full"
      >
        <div className="relative overflow-hidden rounded-3xl h-full min-h-96 flex flex-col justify-between">
          {/* Background with gradient */}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${scene.theme.primary}15 0%, ${scene.theme.secondary}15 50%, ${scene.theme.accent}15 100%)`,
            }}
          />

          {/* Glassmorphic Border */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${scene.theme.accent}30, transparent)`,
              border: `2px solid ${scene.theme.accent}20`,
            }}
            whileHover={{
              boxShadow: `0 0 30px ${scene.theme.accent}40, inset 0 0 30px ${scene.theme.accent}20`,
            }}
          />

          {/* Animated Gradient Blob */}
          <motion.div
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full"
            style={{
              background: `radial-gradient(circle, ${scene.theme.accent}40, transparent)`,
            }}
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          {/* Top Section with Icon */}
          <div className="relative z-10 p-8">
            <div className="flex items-start justify-between mb-6">
              <motion.div
                className="text-6xl drop-shadow-lg"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {scene.emoji}
              </motion.div>

              {/* Active Indicator */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-500/50"
              >
                <Zap className="w-3 h-3 text-green-400" />
                <span className="text-xs font-semibold text-green-300">Live</span>
              </motion.div>
            </div>

            {/* Title */}
            <motion.h2
              className="text-4xl font-bold mb-2 leading-tight transition-colors"
              style={{ color: scene.theme.text }}
              whileHover={{ letterSpacing: '0.05em' }}
            >
              {scene.name}
            </motion.h2>

            {/* Description */}
            <p
              className="text-sm opacity-70 mb-6"
              style={{ color: scene.theme.text }}
            >
              {scene.description}
            </p>
          </div>

          {/* Bottom Section with Stats */}
          <div className="relative z-10 p-8 pt-0 flex items-end justify-between">
            <div>
              {/* Presence Count with Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3 }}
              >
                <motion.p
                  className="text-4xl font-black transition-colors"
                  style={{ color: scene.theme.accent }}
                  key={presenceCount}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {presenceCount}
                </motion.p>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mt-1"
                  style={{ color: scene.theme.muted }}
                >
                  {scene.activeText}
                </p>
              </motion.div>
            </div>

            {/* Arrow Icon */}
            <motion.div
              initial={{ x: 0, opacity: 0.6 }}
              whileHover={{ x: 8, opacity: 1 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 rounded-full blur-lg"
                style={{ background: scene.theme.accent }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.3 }}
              />
              <div
                className="relative w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
                style={{ background: `${scene.theme.accent}20`, border: `2px solid ${scene.theme.accent}50` }}
              >
                <ChevronRight
                  className="w-6 h-6"
                  style={{ color: scene.theme.accent }}
                />
              </div>
            </motion.div>
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-3xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${scene.theme.accent}30, transparent 70%)`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </Link>
  );
}
