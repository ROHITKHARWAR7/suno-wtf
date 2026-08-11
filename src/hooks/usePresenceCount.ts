'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

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
     * IMPORTANT:
     *
     * Supabase reuses a channel when the same topic already
     * exists. React Strict Mode can cause an old channel to
     * still exist while this effect runs again.
     *
     * Remove any existing channel for this scene FIRST.
     */
    const setupPresence = async () => {
      const existingChannel = supabase
        .getChannels()
        .find(
          (channel) =>
            channel.topic ===
            `realtime:${channelName}`
        );

      if (existingChannel) {
        await supabase.removeChannel(
          existingChannel
        );
      }

      if (cancelled) return;

      /*
       * Create a completely fresh channel.
       */
      const channel = supabase.channel(
        channelName,
        {
          config: {
            presence: {
              key: crypto.randomUUID(),
            },
          },
        }
      );

      /*
       * Calculate current users.
       */
      const updatePresenceCount = () => {
        if (cancelled) return;

        const state =
          channel.presenceState();

        const count =
          Object.keys(state).length;

        setPresenceCount(count);
      };

      /*
       * IMPORTANT:
       *
       * Register ALL Presence callbacks BEFORE
       * subscribe().
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
       * Now subscribe.
       */
      channel.subscribe(async (status) => {
        if (cancelled) return;

        if (status === 'SUBSCRIBED') {
          try {
            await channel.track({
              sceneId,
              onlineAt:
                new Date().toISOString(),
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

      /*
       * Cleanup function for this channel.
       */
      return channel;
    };

    let activeChannel:
      | ReturnType<typeof supabase.channel>
      | null = null;

    setupPresence().then((channel) => {
      if (cancelled) {
        if (channel) {
          supabase.removeChannel(channel);
        }

        return;
      }

      activeChannel = channel;
    });

    /*
     * Cleanup.
     */
    return () => {
      cancelled = true;

      setPresenceCount(0);

      if (activeChannel) {
        activeChannel
          .untrack()
          .catch(() => {
            // Ignore cleanup errors.
          })
          .finally(() => {
            supabase.removeChannel(
              activeChannel!
            );
          });
      }
    };
  }, [sceneId]);

  return presenceCount;
}