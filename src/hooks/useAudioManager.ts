import { useEffect, useRef, useState } from 'react';

interface AudioManagerOptions {
  volume?: number;
  loop?: boolean;
  fadeInDuration?: number;
  fadeOutDuration?: number;
}

export const useAudioManager = (audioSrc: string, options: AudioManagerOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolume] = useState(options.volume || 0.5);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.preload = 'auto';
    audio.loop = options.loop || false;
    audio.volume = 0;
    
    const handleCanPlayThrough = () => {
      setIsLoaded(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('ended', handleEnded);
    
    audioRef.current = audio;

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, [audioSrc, options.loop]);

  const fadeVolume = (targetVolume: number, duration: number = 1000) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const startVolume = audio.volume;
    const volumeDiff = targetVolume - startVolume;
    const steps = 50;
    const stepTime = duration / steps;
    const stepVolume = volumeDiff / steps;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    let currentStep = 0;
    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const newVolume = startVolume + (stepVolume * currentStep);
      
      if (currentStep >= steps) {
        audio.volume = targetVolume;
        setVolume(targetVolume);
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
      } else {
        audio.volume = newVolume;
        setVolume(newVolume);
      }
    }, stepTime);
  };

  const play = () => {
    if (audioRef.current && isLoaded) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        fadeVolume(options.volume || 0.5, options.fadeInDuration || 2000);
      }).catch(console.error);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      fadeVolume(0, options.fadeOutDuration || 1000);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }, options.fadeOutDuration || 1000);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      fadeVolume(0, options.fadeOutDuration || 500);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsPlaying(false);
        }
      }, options.fadeOutDuration || 500);
    }
  };

  const setVolumeInstant = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  return {
    play,
    pause,
    stop,
    isPlaying,
    isLoaded,
    volume,
    setVolume: setVolumeInstant,
    fadeVolume
  };
};