'use client';

import { motion } from 'framer-motion';
import { Scene } from '@/types';
import Link from 'next/link';
import { usePresenceCount } from '@/hooks/usePresenceCount';
import { ChevronRight } from 'lucide-react';

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
        whileHover={{ y: -5 }}
        className="group cursor-pointer"
      >
        <div
          className="relative rounded-2xl p-6 md:p-8 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${scene.theme.primary} 0%, ${scene.theme.secondary} 100%)`,
          }}
        >
          {/* Gradient Overlay on Hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${scene.theme.accent} 0%, transparent 100%)`,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Emoji */}
            <motion.div
              className="text-5xl mb-4"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {scene.emoji}
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-2 transition-colors"
              style={{ color: scene.theme.text }}
              whileHover={{ letterSpacing: '0.05em' }}
            >
              {scene.name}
            </motion.h2>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              className="flex items-center justify-between"
            >
              <div>
                <p
                  className="text-sm font-semibold uppercase tracking-wide"
                  style={{ color: scene.theme.muted }}
                >
                  {presenceCount}
                </p>
                <p
                  className="text-xs uppercase opacity-80"
                  style={{ color: scene.theme.text }}
                >
                  {scene.activeText}
                </p>
              </div>

              {/* Arrow Icon */}
              <motion.div
                initial={{ x: 0, opacity: 0.6 }}
                whileHover={{ x: 4, opacity: 1 }}
                style={{ color: scene.theme.accent }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </div>

          {/* Subtle Border */}
          <motion.div
            className="absolute inset-0 rounded-2xl border"
            style={{ borderColor: scene.theme.accent, opacity: 0.3 }}
            whileHover={{ opacity: 0.6 }}
          />
        </div>
      </motion.div>
    </Link>
  );
}
