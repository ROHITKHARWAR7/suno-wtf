'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Track } from '@/types';

export type AudioPlayerState = {
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playlist: Track[];
};

export function useAudioPlayer(initialPlaylist: Track[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    currentTrackIndex: 0,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    playlist: initialPlaylist,
  });

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleTrackEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleTrackEnd);
      }
    };
  }, []);

  // Update audio src when track changes
  useEffect(() => {
    const track = state.playlist[state.currentTrackIndex];
    if (audioRef.current && track) {
      // For demo: use a silent audio or show demo mode
      const src = track.src || '';
      audioRef.current.src = src;

      if (state.isPlaying && src) {
        audioRef.current
          .play()
          .catch(() => {
            // Autoplay blocked or file not found
            setState((prev) => ({ ...prev, isPlaying: false }));
          });
      }
    }
  }, [state.currentTrackIndex, state.playlist]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setState((prev) => ({
        ...prev,
        currentTime: audioRef.current?.currentTime || 0,
      }));
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setState((prev) => ({
        ...prev,
        duration: audioRef.current?.duration || 0,
      }));
    }
  }, []);

  const handleTrackEnd = useCallback(() => {
    handleNext();
  }, []);

  const play = useCallback(() => {
    if (audioRef.current && audioRef.current.src) {
      audioRef.current.play().catch(() => {
        // Handle autoplay errors silently
      });
      setState((prev) => ({ ...prev, isPlaying: true }));
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const handleNext = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentTrackIndex: (prev.currentTrackIndex + 1) % prev.playlist.length,
      currentTime: 0,
    }));
  }, []);

  const handlePrevious = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentTrackIndex:
        prev.currentTrackIndex === 0
          ? prev.playlist.length - 1
          : prev.currentTrackIndex - 1,
      currentTime: 0,
    }));
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState((prev) => ({ ...prev, currentTime: time }));
    }
  }, []);

  const currentTrack = state.playlist[state.currentTrackIndex] || null;
  const progress = state.duration ? (state.currentTime / state.duration) * 100 : 0;

  return {
    ...state,
    currentTrack,
    progress,
    play,
    pause,
    togglePlayPause,
    next: handleNext,
    previous: handlePrevious,
    seek,
    audioRef,
  };
}
