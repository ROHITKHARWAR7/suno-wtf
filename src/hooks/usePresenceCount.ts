'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export function usePresenceCount(sceneId: string) {
  const [presenceCount, setPresenceCount] = useState(0);

  useEffect(() => {
    if (!sceneId) {
      setPresenceCount(0);
      return;
    }

    let cancelled = false;

    const channelName = `presence:${sceneId}`;

    /*
     * Setup presence channel.
     *
     * Explicitly return RealtimeChannel | null so
     * TypeScript never infers undefined.
     */
    const setupPresence = async (): Promise<RealtimeChannel | null> => {
      /*
       * Remove any existing channel for this scene.
       * This helps with React Strict Mode where the effect
       * can run more than once during development.
       */
      const existingChannel = supabase
        .getChannels()
        .find(
          (channel) =>
            channel.topic === `realtime:${channelName}`
        );

      if (existingChannel) {
        await supabase.removeChannel(existingChannel);
      }

      /*
       * If the effect was cancelled while removing the old
       * channel, return null instead of undefined.
       */
      if (cancelled) {
        return null;
      }

      /*
       * Create a fresh channel.
       */
      const channel = supabase.channel(channelName, {
        config: {
          presence: {
            key: crypto.randomUUID(),
          },
        },
      });

      /*
       * Calculate current users.
       */
      const updatePresenceCount = () => {
        if (cancelled) return;

        const state = channel.presenceState();

        const count = Object.keys(state).length;

        setPresenceCount(count);
      };

      /*
       * Register all Presence callbacks BEFORE subscribe().
       */
      channel
        .on(
          'presence',
          { event: 'sync' },
          () => {
            updatePresenceCount();
          }
        )
        .on(
          'presence',
          { event: 'join' },
          () => {
            updatePresenceCount();
          }
        )
        .on(
          'presence',
          { event: 'leave' },
          () => {
            updatePresenceCount();
          }
        );

      /*
       * Subscribe to the presence channel.
       */
      channel.subscribe(async (status) => {
        if (cancelled) return;

        if (status === 'SUBSCRIBED') {
          try {
            await channel.track({
              sceneId,
              onlineAt: new Date().toISOString(),
            });

            updatePresenceCount();
          } catch (error) {
            console.error(
              'Failed to track presence:',
              error
            );
          }
        }

        if (
          status === 'CHANNEL_ERROR' ||
          status === 'TIMED_OUT'
        ) {
          console.error(
            `Presence connection failed for ${sceneId}`
          );

          setPresenceCount(0);
        }
      });

      return channel;
    };

    /*
     * Keep track of the active channel.
     */
    let activeChannel: RealtimeChannel | null = null;

    setupPresence().then((channel) => {
      /*
       * If cleanup happened before setup completed,
       * immediately remove the newly-created channel.
       */
      if (cancelled) {
        if (channel) {
          supabase.removeChannel(channel);
        }

        return;
      }

      /*
       * channel is now guaranteed to be either
       * RealtimeChannel or null.
       */
      activeChannel = channel;
    });

    /*
     * Cleanup.
     */
    return () => {
      cancelled = true;

      setPresenceCount(0);

      if (activeChannel) {
        const channelToRemove = activeChannel;

        activeChannel = null;

        channelToRemove
          .untrack()
          .catch(() => {
            // Ignore cleanup errors.
          })
          .finally(() => {
            supabase.removeChannel(channelToRemove);
          });
      }
    };
  }, [sceneId]);

  return presenceCount;
}