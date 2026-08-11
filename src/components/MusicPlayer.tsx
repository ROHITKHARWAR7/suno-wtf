'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Track } from '@/types';

interface MusicPlayerProps {
  playlist: Track[];
  accentColor?: string;
  youtubePlaylistId: string;
}

/*
 * Neutral video used ONLY to initialize the YouTube iframe.
 *
 * The actual music playlist is loaded immediately after
 * the player becomes ready.
 *
 * This is NOT a scene song.
 */
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

  // Actual YouTube title
  const [youtubeTitle, setYoutubeTitle] = useState('');

  const currentTrack = useMemo(
    () =>
      playlist.find(
        (track) => track.id === currentTrackId
      ) ?? playlist[0],
    [playlist, currentTrackId]
  );

  /*
   * Reset player state whenever the scene playlist changes.
   *
   * This is important when moving between:
   * Kitchen → Saloon → Shaadi → Breakup etc.
   */
  useEffect(() => {
    setIsPlaying(false);
    setIsPlayerReady(false);
    setYoutubeTitle('');
    setCurrentTime(0);
    setDuration(0);
    setCurrentTrackId(playlist[0]?.id ?? '');

    playerRef.current = null;
  }, [youtubePlaylistId, playlist]);

  /*
   * Update progress and current YouTube title.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;

      if (!player || !isPlayerReady) return;

      try {
        const time =
          player.getCurrentTime?.() ?? 0;

        const total =
          player.getDuration?.() ?? 0;

        setCurrentTime(time);

        if (total > 0) {
          setDuration(total);
        }

        const videoData =
          player.getVideoData?.();

        if (videoData?.title) {
          setYoutubeTitle(videoData.title);
        }
      } catch {
        // Player may not be ready.
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPlayerReady]);

  /*
   * YouTube iframe options.
   *
   * We intentionally DON'T put the playlist inside
   * playerVars. We load the playlist explicitly.
   */
  const opts: YouTubeProps['opts'] = {
    height: '1',
    width: '1',

    playerVars: {
      autoplay: 0,
      controls: 0,
      playsinline: 1,
    },
  };

  /*
   * Player ready.
   */
  const handleReady: YouTubeProps['onReady'] = (event) => {
    const player = event.target;

    playerRef.current = player;
    setIsPlayerReady(true);

    try {
      player.setLoop(false);

      /*
       * IMPORTANT:
       *
       * Load the playlist belonging to THIS scene.
       *
       * Examples:
       *
       * Kitchen  → PLPr-XuFuXX3I
       * Majdoor  → PLZysXNxsYg_0
       * Saloon   → PLeI8ucVnozxw
       * Shaadi   → PLEwG0PgoYma4
       * Breakup  → PLWN9Lxvnbb-0
       */
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

  /*
   * YouTube state changes.
   */
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

    /*
     * PLAYING
     */
    if (event.data === 1) {
      setIsPlaying(true);
    }

    /*
     * PAUSED
     */
    if (event.data === 2) {
      setIsPlaying(false);
    }

    /*
     * ENDED
     */
    if (event.data === 0) {
      setIsPlaying(false);
    }
  };

  /*
   * Play / Pause.
   */
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

  /*
   * Next song.
   */
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
          const videoData =
            player.getVideoData();

          if (videoData?.title) {
            setYoutubeTitle(videoData.title);
          }

          const total =
            player.getDuration();

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

  /*
   * Previous song.
   */
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
          const videoData =
            player.getVideoData();

          if (videoData?.title) {
            setYoutubeTitle(videoData.title);
          }

          const total =
            player.getDuration();

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

  /*
   * Seek.
   */
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

  /*
   * Format time.
   */
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
          /*
           * IMPORTANT:
           *
           * The key forces React to create a completely
           * new YouTube iframe whenever the scene changes.
           *
           * Therefore:
           *
           * Shaadi → new player
           * Saloon → new player
           * Kitchen → new player
           * etc.
           */
          key={youtubePlaylistId}

          /*
           * This is ONLY a neutral initialization video.
           * It is immediately replaced by loadPlaylist().
           */
          videoId={PLAYER_INIT_VIDEO}

          opts={opts}
          onReady={handleReady}
          onStateChange={handleStateChange}
        />
      </div>

      {/* =========================================
          MAIN MUSIC PLAYER
      ========================================= */}

      <div className="rounded-3xl bg-slate-950/90 p-8 text-white shadow-2xl ring-1 ring-white/10">

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          {/* TRACK INFORMATION */}

          <div className="min-w-0">

            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              Now playing
            </p>

            <h2 className="mt-3 truncate text-3xl font-bold tracking-tight">
              {youtubeTitle ||
                currentTrack?.title ||
                'No song playing'}
            </h2>

            <p className="mt-2 truncate text-sm text-slate-300">
              {youtubeTitle
                ? 'YouTube'
                : currentTrack?.artist ?? 'YouTube'}
            </p>

          </div>

          {/* CONTROLS */}

          <div className="flex shrink-0 items-center gap-3 rounded-3xl bg-white/10 p-3 shadow-inner">

            {/* PREVIOUS */}

            <button
              disabled={!isPlayerReady}
              className="rounded-full bg-white/10 p-3 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ color: accentColor }}
              onClick={handlePreviousTrack}
              aria-label="Previous track"
            >
              <SkipBack className="h-5 w-5" />
            </button>

            {/* PLAY / PAUSE */}

            <button
              disabled={!isPlayerReady}
              className="rounded-full bg-white/10 p-3 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ color: accentColor }}
              onClick={handleTogglePlay}
              aria-label={
                isPlaying
                  ? 'Pause'
                  : 'Play'
              }
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>

            {/* NEXT */}

            <button
              disabled={!isPlayerReady}
              className="rounded-full bg-white/10 p-3 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ color: accentColor }}
              onClick={handleNextTrack}
              aria-label="Next track"
            >
              <SkipForward className="h-5 w-5" />
            </button>

          </div>

        </div>

        {/* =========================================
            PROGRESS BAR
        ========================================= */}

        <div className="mt-8">

          <input
            type="range"
            min="0"
            max={duration || 100}
            value={Math.min(
              currentTime,
              duration || 100
            )}
            onChange={handleSeek}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10"
            aria-label="Seek music"
          />

          <div className="mt-2 flex justify-between text-xs text-slate-500">

            <span>
              {formatTime(currentTime)}
            </span>

            <span>
              {formatTime(duration)}
            </span>

          </div>

        </div>

      </div>

      {/* =========================================
          LOCAL QUEUE
          
          Empty now because YouTube is the real
          playlist source.
      ========================================= */}

      {playlist.length > 0 && (
        <div className="grid gap-3 rounded-3xl bg-white/90 p-5 text-slate-900 shadow-lg">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Queue
          </p>

          <div className="space-y-2">

            {playlist.map((track) => (

              <button
                key={track.id}
                onClick={() => {

                  setCurrentTrackId(track.id);

                  const player =
                    playerRef.current;

                  if (
                    player &&
                    isPlayerReady
                  ) {
                    player.playVideo();
                  }

                  setIsPlaying(true);

                }}
                className={`w-full rounded-2xl px-4 py-3 text-left transition hover:bg-slate-100 ${
                  track.id === currentTrack?.id
                    ? 'bg-slate-100'
                    : ''
                }`}
              >

                <div className="flex items-center justify-between gap-2">

                  <div className="min-w-0">

                    <p className="truncate font-semibold">
                      {track.title}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {track.artist}
                    </p>

                  </div>

                  <span className="shrink-0 text-xs text-slate-400">

                    {Math.floor(
                      track.duration / 60
                    )}
                    :
                    {String(
                      track.duration % 60
                    ).padStart(2, '0')}

                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>
      )}

    </div>
  );
}