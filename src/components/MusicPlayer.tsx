'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Disc3,
} from 'lucide-react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Track } from '@/types';

interface MusicPlayerProps {
  playlist: Track[];
  accentColor?: string;
  youtubePlaylistId: string;
}

const PLAYER_INIT_VIDEO = 'M7lc1UVf-VE';

export function MusicPlayer({
  playlist,
  accentColor = '#000',
  youtubePlaylistId,
}: MusicPlayerProps) {
  const playerRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const [currentTrackId, setCurrentTrackId] = useState(
    playlist[0]?.id ?? ''
  );

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [youtubeTitle, setYoutubeTitle] = useState('');
  const [showQueue, setShowQueue] = useState(false);

  // Audio visualizer
  const [visualizerBars, setVisualizerBars] = useState(
    Array(8).fill(0)
  );

  const currentTrack = useMemo(
    () =>
      playlist.find(
        (track) => track.id === currentTrackId
      ) ?? playlist[0],
    [playlist, currentTrackId]
  );

  useEffect(() => {
    setIsPlaying(false);
    setIsPlayerReady(false);
    setYoutubeTitle('');
    setCurrentTime(0);
    setDuration(0);
    setCurrentTrackId(playlist[0]?.id ?? '');
    setShowQueue(false);
    playerRef.current = null;
  }, [youtubePlaylistId, playlist]);

  // Animate visualizer bars
  useEffect(() => {
    if (!isPlaying) {
      setVisualizerBars(Array(8).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setVisualizerBars((prev) =>
        prev.map(() => Math.random() * 100)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;

      if (!player || !isPlayerReady) return;

      try {
        const time = player.getCurrentTime?.() ?? 0;
        const total = player.getDuration?.() ?? 0;

        setCurrentTime(time);

        if (total > 0) {
          setDuration(total);
        }

        const videoData = player.getVideoData?.();

        if (videoData?.title) {
          setYoutubeTitle(videoData.title);
        }
      } catch {
        // Player may not be ready.
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPlayerReady]);

  const opts: YouTubeProps['opts'] = {
    height: '1',
    width: '1',

    playerVars: {
      autoplay: 0,
      controls: 0,
      playsinline: 1,
    },
  };

  const handleReady: YouTubeProps['onReady'] = (event) => {
    const player = event.target;

    playerRef.current = player;
    setIsPlayerReady(true);

    try {
      player.setLoop(false);

      if (youtubePlaylistId) {
        player.loadPlaylist({
          list: youtubePlaylistId,
          listType: 'playlist',
          index: 0,
        });
      }
    } catch (error) {
      console.error(
        'Failed to load YouTube playlist:',
        error
      );
    }
  };

  const handleStateChange: YouTubeProps['onStateChange'] = (
    event
  ) => {
    const player = event.target;

    try {
      const videoData = player.getVideoData();

      if (videoData?.title) {
        setYoutubeTitle(videoData.title);
      }

      const total = player.getDuration();

      if (total > 0) {
        setDuration(total);
      }
    } catch {
      // Player may still be loading.
    }

    if (event.data === 1) {
      setIsPlaying(true);
    }

    if (event.data === 2) {
      setIsPlaying(false);
    }

    if (event.data === 0) {
      setIsPlaying(false);
    }
  };

  function handleTogglePlay() {
    const player = playerRef.current;

    if (!player || !isPlayerReady) {
      console.warn(
        'YouTube player is not ready yet.'
      );
      return;
    }

    try {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    } catch (error) {
      console.error(
        'Unable to control YouTube player:',
        error
      );
    }
  }

  function handleNextTrack() {
    const player = playerRef.current;

    if (!player || !isPlayerReady) {
      return;
    }

    try {
      player.nextVideo();

      setIsPlaying(true);
      setCurrentTime(0);

      setTimeout(() => {
        try {
          const videoData = player.getVideoData();

          if (videoData?.title) {
            setYoutubeTitle(videoData.title);
          }

          const total = player.getDuration();

          if (total > 0) {
            setDuration(total);
          }
        } catch {
          // Player is changing tracks.
        }
      }, 700);
    } catch (error) {
      console.error(
        'Unable to play next track:',
        error
      );
    }
  }

  function handlePreviousTrack() {
    const player = playerRef.current;

    if (!player || !isPlayerReady) {
      return;
    }

    try {
      player.previousVideo();

      setIsPlaying(true);
      setCurrentTime(0);

      setTimeout(() => {
        try {
          const videoData = player.getVideoData();

          if (videoData?.title) {
            setYoutubeTitle(videoData.title);
          }

          const total = player.getDuration();

          if (total > 0) {
            setDuration(total);
          }
        } catch {
          // Player is changing tracks.
        }
      }, 700);
    } catch (error) {
      console.error(
        'Unable to play previous track:',
        error
      );
    }
  }

  function handleSeek(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const newTime = Number(event.target.value);

    setCurrentTime(newTime);

    const player = playerRef.current;

    if (!player || !isPlayerReady) return;

    try {
      player.seekTo(newTime, true);
    } catch {
      // Ignore seek errors.
    }
  }

  function formatTime(seconds: number) {
    if (
      !Number.isFinite(seconds) ||
      seconds < 0
    ) {
      return '0:00';
    }

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${String(secs).padStart(
      2,
      '0'
    )}`;
  }

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* =========================================
          INVISIBLE YOUTUBE PLAYER
      ========================================= */}

      <div
        className="pointer-events-none absolute"
        style={{
          width: 1,
          height: 1,
          overflow: 'hidden',
          opacity: 0,
        }}
      >
        <YouTube
          key={youtubePlaylistId}
          videoId={PLAYER_INIT_VIDEO}
          opts={opts}
          onReady={handleReady}
          onStateChange={handleStateChange}
        />
      </div>

      {/* =========================================
          MAIN MUSIC PLAYER CONTAINER
      ========================================= */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 rounded-3xl backdrop-blur-sm p-8 shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}05 100%)`,
          border: `2px solid ${accentColor}30`,
        }}
      >
        {/* =========================================
            VISUALIZER
        ========================================= */}

        <motion.div
          className="flex items-end justify-center gap-2 h-32 rounded-2xl p-6"
          style={{
            background: `${accentColor}10`,
            border: `1px solid ${accentColor}20`,
          }}
        >
          {visualizerBars.map((height, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-full"
              style={{
                backgroundColor: accentColor,
                height: `${Math.max(10, height)}%`,
              }}
              animate={{
                scaleY: isPlaying ? 1 : 0.3,
              }}
              transition={{
                duration: 0.1,
              }}
            />
          ))}
        </motion.div>

        {/* =========================================
            TRACK INFORMATION
        ========================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={youtubeTitle}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              duration: isPlaying ? 3 : 0,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex justify-center mb-4"
          >
            <Disc3
              className="w-12 h-12"
              style={{ color: accentColor }}
            />
          </motion.div>

          <p className="text-xs uppercase tracking-widest opacity-60 mb-2">
            Now playing
          </p>

          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-2 line-clamp-2"
            style={{
              background: `linear-gradient(90deg, ${accentColor}, #fff)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {youtubeTitle || currentTrack?.title || 'No song playing'}
          </h2>

          <p className="text-sm opacity-70">
            {youtubeTitle ? 'YouTube Music' : currentTrack?.artist ?? 'YouTube'}
          </p>
        </motion.div>

        {/* =========================================
            PROGRESS BAR
        ========================================= */}

        <div className="space-y-3">
          <div
            className="relative h-2 rounded-full overflow-hidden cursor-pointer group/bar"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor: accentColor,
              }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'tween', duration: 0.1 }}
            >
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-lg group-hover/bar:scale-125"
                style={{
                  backgroundColor: accentColor,
                }}
                whileHover={{ scale: 1.3 }}
              />
            </motion.div>

            <input
              type="range"
              min="0"
              max={duration || 100}
              value={Math.min(currentTime, duration || 100)}
              onChange={handleSeek}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              aria-label="Seek music"
            />
          </div>

          <div className="flex justify-between text-xs opacity-60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* =========================================
            CONTROLS
        ========================================= */}

        <div className="flex items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={!isPlayerReady}
            className="p-3 rounded-full transition-all"
            style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
              border: `2px solid ${accentColor}30`,
              opacity: !isPlayerReady ? 0.5 : 1,
            }}
            onClick={handlePreviousTrack}
            aria-label="Previous track"
          >
            <SkipBack className="h-6 w-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            disabled={!isPlayerReady}
            className="p-5 rounded-full transition-all shadow-lg"
            style={{
              backgroundColor: accentColor,
              color: '#fff',
              opacity: !isPlayerReady ? 0.6 : 1,
            }}
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="h-7 w-7 fill-current" />
            ) : (
              <Play className="h-7 w-7 fill-current ml-1" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={!isPlayerReady}
            className="p-3 rounded-full transition-all"
            style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
              border: `2px solid ${accentColor}30`,
              opacity: !isPlayerReady ? 0.5 : 1,
            }}
            onClick={handleNextTrack}
            aria-label="Next track"
          >
            <SkipForward className="h-6 w-6" />
          </motion.button>
        </div>

        {/* Queue Toggle */}
        {playlist.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowQueue(!showQueue)}
            className="w-full py-3 px-4 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all"
            style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
              border: `1px solid ${accentColor}30`,
            }}
          >
            {showQueue ? 'Hide Queue' : 'Show Queue'}
          </motion.button>
        )}
      </motion.div>

      {/* =========================================
          QUEUE LIST
      ========================================= */}

      {showQueue && playlist.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-3 rounded-3xl p-6 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${accentColor}10 0%, ${accentColor}05 100%)`,
            border: `2px solid ${accentColor}20`,
          }}
        >
          <p
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            Queue
          </p>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {playlist.map((track, index) => (
              <motion.button
                key={track.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => {
                  setCurrentTrackId(track.id);

                  const player = playerRef.current;

                  if (player && isPlayerReady) {
                    player.playVideo();
                  }

                  setIsPlaying(true);
                }}
                className="w-full rounded-2xl px-4 py-3 text-left transition-all group"
                style={{
                  backgroundColor:
                    track.id === currentTrack?.id
                      ? `${accentColor}20`
                      : 'transparent',
                }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <motion.p className="truncate font-semibold text-sm group-hover:opacity-80 transition">
                      {track.title}
                    </motion.p>

                    <p className="truncate text-xs opacity-60">
                      {track.artist}
                    </p>
                  </div>

                  <span className="shrink-0 text-xs opacity-50">
                    {Math.floor(track.duration / 60)}:
                    {String(track.duration % 60).padStart(2, '0')}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
