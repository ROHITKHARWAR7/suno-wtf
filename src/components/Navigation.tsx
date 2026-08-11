'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { SCENE_ORDER, SCENES } from '@/data/scenes';

export function Navigation({ currentScene }: { currentScene?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Back Button */}
      {currentScene && (
        <Link href="/">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed top-6 left-6 z-40 p-2 hover:bg-black/5 rounded-lg transition-colors"
            aria-label="Go back home"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
        </Link>
      )}

      {/* Scene Switcher Button */}
      {currentScene && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-6 right-6 z-40 p-2 hover:bg-black/5 rounded-lg transition-colors"
          aria-label="Open scene menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Scene Menu Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="bg-white w-full rounded-t-3xl p-6 max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Scenes</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <Link href="/">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="font-semibold">← Home</div>
                </motion.div>
              </Link>

              {SCENE_ORDER.map((sceneId) => {
                const scene = SCENES[sceneId];
                const isActive = currentScene === sceneId;

                return (
                  <Link key={sceneId} href={`/${sceneId}`}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`p-4 rounded-lg transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-black text-white'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{scene.emoji}</span>
                        <span className="font-semibold">{scene.name}</span>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
