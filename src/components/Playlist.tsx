'use client';

import { motion } from 'framer-motion';
import { Track } from '@/types';
import { formatTime } from '@/lib/utils';
import { Play } from 'lucide-react';

interface PlaylistProps {
  tracks: Track[];
  currentTrackId?: string;
  onTrackSelect?: (trackId: string) => void;
  accentColor?: string;
}

export function Playlist({
  tracks,
  currentTrackId,
  onTrackSelect,
  accentColor = '#000',
}: PlaylistProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-4">
        Playlist
      </h3>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {tracks.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onTrackSelect?.(track.id)}
            className={`p-3 rounded-lg cursor-pointer transition-all ${
              currentTrackId === track.id
                ? 'bg-gray-100'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              {currentTrackId === track.id && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Play
                    className="w-4 h-4 fill-current"
                    style={{ color: accentColor }}
                  />
                </motion.div>
              )}

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{track.title}</p>
                <p className="text-xs text-gray-600 truncate">{track.artist}</p>
              </div>

              <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                {formatTime(track.duration)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
