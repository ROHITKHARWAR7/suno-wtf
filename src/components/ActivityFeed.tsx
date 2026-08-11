'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneActivity } from '@/hooks/useSceneActivity';
import { Activity } from '@/types';
import { Heart, Zap, Plus } from 'lucide-react';

interface ActivityFeedProps {
  sceneId: string;
  accentColor?: string;
}

const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  join: <Plus className="w-3 h-3" />,
  play: <Zap className="w-3 h-3" />,
  pause: <Zap className="w-3 h-3" />,
  next: <Zap className="w-3 h-3" />,
  like: <Heart className="w-3 h-3" />,
};

export function ActivityFeed({ sceneId, accentColor = '#000' }: ActivityFeedProps) {
  const activities = useSceneActivity(sceneId, 4);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold uppercase tracking-wider opacity-70">
        Right Now
      </h3>

      <div className="space-y-2 max-h-40">
        <AnimatePresence>
          {activities.map((activity: Activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="text-xs py-2 px-3 rounded-lg bg-gray-50 flex items-center gap-2"
            >
              <div style={{ color: accentColor }} className="flex-shrink-0">
                {ACTIVITY_ICONS[activity.type] || <Plus className="w-3 h-3" />}
              </div>
              <span className="text-gray-700 line-clamp-2">{activity.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {activities.length === 0 && (
          <p className="text-xs text-gray-500 py-4">Waiting for activity...</p>
        )}
      </div>
    </div>
  );
}
