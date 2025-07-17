import { useEffect, useRef, useState } from 'react';

interface AudioMixerConfig {
  track1Volume: number;
  track2Volume: number;
  masterVolume: number;
  crossfadePosition: number;
}

export const useAudioMixer = () => {
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [config] = useState<AudioMixerConfig>({
    track1Volume: 0.8,
    track2Volume: 0.7,
    masterVolume: 0.9,
    crossfadePosition: 0.5
  });

  useEffect(() => {
    initializeAudioSystem();
    return cleanup;
  }, []);

  const initializeAudioSystem = async () => {
    try {
      // Create audio elements with correct paths
      audio1Ref.current = new Audio('./11L-medium_sound_raining-1752763639584.mp3');
      audio2Ref.current = new Audio('./11L-medium_sound_raining-1752764780047.mp3');
      
      // Configure audio properties
      [audio1Ref.current, audio2Ref.current].forEach(audio => {
        if (audio) {
          audio.loop = true;
          audio.preload = 'auto';
          audio.volume = 0.4; // Start with audible volume
          audio.crossOrigin = 'anonymous';
        }
      });

      // Wait for both tracks to load
      await Promise.all([
        new Promise((resolve, reject) => {
          if (audio1Ref.current) {
            audio1Ref.current.addEventListener('canplaythrough', resolve, { once: true });
            audio1Ref.current.addEventListener('error', reject, { once: true });
            audio1Ref.current.load();
          }
        }),
        new Promise((resolve, reject) => {
          if (audio2Ref.current) {
            audio2Ref.current.addEventListener('canplaythrough', resolve, { once: true });
            audio2Ref.current.addEventListener('error', reject, { once: true });
            audio2Ref.current.load();
          }
        })
      ]);
      
      setIsLoaded(true);
      console.log('Audio files loaded successfully');
      
      // Auto-start after 3 seconds
      setTimeout(() => {
        startMixedPlayback();
      }, 3000);
      
    } catch (error) {
      console.error('Audio initialization failed:', error);
      // Fallback: try to play without Web Audio API
      fallbackAudioPlay();
    }
  };

  const fallbackAudioPlay = () => {
    if (audio1Ref.current && audio2Ref.current) {
      audio1Ref.current.volume = 0.6;
      audio2Ref.current.volume = 0.4;
      
      audio1Ref.current.play().catch(console.error);
      audio2Ref.current.play().catch(console.error);
      
      setIsPlaying(true);
      setIsLoaded(true);
    }
  };

  const startMixedPlayback = async () => {
    if (!audio1Ref.current || !audio2Ref.current) return;
    
    try {
      // Start with fade-in effect
      audio1Ref.current.volume = 0;
      audio2Ref.current.volume = 0;
      
      // Start both tracks
      await Promise.all([
        audio1Ref.current.play(),
        audio2Ref.current.play()
      ]);
      
      // Fade in over 3 seconds
      const fadeSteps = 30;
      const fadeInterval = 100; // 100ms intervals
      let step = 0;
      
      const fadeIn = setInterval(() => {
        step++;
        const progress = step / fadeSteps;
        
        if (audio1Ref.current && audio2Ref.current) {
          audio1Ref.current.volume = Math.min(0.6 * progress, 0.6);
          audio2Ref.current.volume = Math.min(0.4 * progress, 0.4);
        }
        
        if (step >= fadeSteps) {
          clearInterval(fadeIn);
        }
      }, fadeInterval);
      
      setIsPlaying(true);
      console.log('Audio playback started');
      
    } catch (error) {
      console.error('Playback failed:', error);
      fallbackAudioPlay();
    }
  };

  const stopMixedPlayback = () => {
    if (audio1Ref.current && audio2Ref.current) {
      // Fade out
      const fadeSteps = 20;
      const fadeInterval = 100;
      let step = 0;
      
      const currentVol1 = audio1Ref.current.volume;
      const currentVol2 = audio2Ref.current.volume;
      
      const fadeOut = setInterval(() => {
        step++;
        const progress = 1 - (step / fadeSteps);
        
        if (audio1Ref.current && audio2Ref.current) {
          audio1Ref.current.volume = currentVol1 * progress;
          audio2Ref.current.volume = currentVol2 * progress;
        }
        
        if (step >= fadeSteps) {
          clearInterval(fadeOut);
          audio1Ref.current?.pause();
          audio2Ref.current?.pause();
          setIsPlaying(false);
        }
      }, fadeInterval);
    }
  };

  const cleanup = () => {
    if (audio1Ref.current) {
      audio1Ref.current.pause();
      audio1Ref.current = null;
    }
    if (audio2Ref.current) {
      audio2Ref.current.pause();
      audio2Ref.current = null;
    }
  };

  // Dynamic mixing for natural variation
  useEffect(() => {
    if (!isPlaying || !audio1Ref.current || !audio2Ref.current) return;
    
    const interval = setInterval(() => {
      const time = Date.now() / 1000;
      const variation1 = 0.5 + Math.sin(time * 0.1) * 0.2; // 0.3 to 0.7
      const variation2 = 0.5 + Math.cos(time * 0.08) * 0.15; // 0.35 to 0.65
      
      if (audio1Ref.current && audio2Ref.current) {
        audio1Ref.current.volume = Math.max(0.2, Math.min(0.8, variation1));
        audio2Ref.current.volume = Math.max(0.2, Math.min(0.6, variation2));
      }
    }, 3000); // Update every 3 seconds
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  return {
    isPlaying,
    isLoaded,
    startMixedPlayback,
    stopMixedPlayback,
    config
  };
};