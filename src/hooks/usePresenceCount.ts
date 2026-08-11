'use client';

import { useState, useEffect, useRef } from 'react';

const SCENE_BASE_COUNTS: Record<string, number> = {
  kitchen: 27,
  majdoor: 14,
  saloon: 19,
  shaadi: 42,
  breakup: 83,
};

const VARIANCE = 3; // How much the count can vary
const UPDATE_INTERVAL = 8000; // Update every 8 seconds

export function usePresenceCount(sceneId: string) {
  const baseCount = SCENE_BASE_COUNTS[sceneId] || 20;
  const [count, setCount] = useState(baseCount);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Set initial random count
    setCount(baseCount + Math.floor(Math.random() * VARIANCE) - Math.floor(VARIANCE / 2));

    // Simulate organic changes
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        const change = Math.floor(Math.random() * VARIANCE) - Math.floor(VARIANCE / 2);
        const newCount = Math.max(baseCount - VARIANCE, Math.min(baseCount + VARIANCE, prev + change));
        return newCount;
      });
    }, UPDATE_INTERVAL);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sceneId, baseCount]);

  return count;
}
