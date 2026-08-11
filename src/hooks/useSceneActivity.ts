'use client';

import { useState, useEffect, useRef } from 'react';
import { Activity } from '@/types';

const ACTIVITY_MESSAGES: Record<string, string[]> = {
  kitchen: [
    'Someone just started cooking',
    'Someone changed the song',
    'Someone joined the kitchen',
    'Someone is listening alone',
    'Simmer sounds playing',
    'New recipe discovered',
  ],
  majdoor: [
    'Someone started working',
    'Someone took a break',
    'Someone joined the site',
    'Tools are singing',
    'Work continues',
  ],
  saloon: [
    'Someone got a fresh cut',
    'Mirrors reflecting',
    'Someone is getting ready',
    'New style incoming',
    'Scissors dancing',
  ],
  shaadi: [
    'Someone entered the celebration',
    'Lights are dancing',
    'Music is playing',
    'Celebration started',
    'Someone joined the joy',
  ],
  breakup: [
    'Someone arrived at midnight',
    'Rain is falling',
    'Someone found a song',
    'Healing begins',
    'Memories are playing',
  ],
};

export function useSceneActivity(sceneId: string, maxActivities: number = 5) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idRef = useRef(0);

  useEffect(() => {
    const messages = ACTIVITY_MESSAGES[sceneId] || ACTIVITY_MESSAGES.kitchen;

    const addActivity = () => {
      const message = messages[Math.floor(Math.random() * messages.length)];
      const newActivity: Activity = {
        id: `activity-${idRef.current++}`,
        type: ['join', 'play', 'next', 'like'][Math.floor(Math.random() * 4)] as any,
        message,
        timestamp: Date.now(),
      };

      setActivities((prev) => {
        const updated = [newActivity, ...prev];
        return updated.slice(0, maxActivities);
      });
    };

    // Add initial activity
    addActivity();

    // Add new activity every 12-20 seconds
    intervalRef.current = setInterval(() => {
      addActivity();
    }, 12000 + Math.random() * 8000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sceneId, maxActivities]);

  return activities;
}
