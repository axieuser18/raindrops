import { useEffect, useRef, useState } from 'react';

export const useAudioMixer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    initializeContinuousAudio();
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const initializeContinuousAudio = async () => {
    try {
      // Create audio element
      const audio = new Audio('./11L-medium_sound_raining-1752763639584.mp3');
      audioRef.current = audio;
      
      // Configure for continuous playback
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0.4;
      
      // Handle loading
      audio.addEventListener('canplaythrough', () => {
        setIsLoaded(true);
        console.log('Audio loaded and ready');
        
        // Auto-start after brief delay
        setTimeout(() => {
          startContinuousPlayback();
        }, 500);
      });

      // Handle any interruptions
      audio.addEventListener('pause', () => {
        if (isInitializedRef.current) {
          // Restart if paused unexpectedly
          setTimeout(() => {
            audio.play().catch(console.error);
          }, 100);
        }
      });

      audio.addEventListener('ended', () => {
        if (isInitializedRef.current) {
          // Restart if ended unexpectedly
          audio.currentTime = 0;
          audio.play().catch(console.error);
        }
      });

      // Handle visibility change to keep playing
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && isInitializedRef.current && audio.paused) {
          audio.play().catch(console.error);
        }
      });

      // Load the audio
      audio.load();
      
    } catch (error) {
      console.error('Audio initialization failed:', error);
    }
  };

  const startContinuousPlayback = async () => {
    if (!audioRef.current) return;

    try {
      // Start with fade-in
      audioRef.current.volume = 0;
      await audioRef.current.play();
      
      // Smooth fade-in
      const fadeIn = setInterval(() => {
        if (audioRef.current && audioRef.current.volume < 0.4) {
          audioRef.current.volume = Math.min(0.4, audioRef.current.volume + 0.02);
        } else {
          clearInterval(fadeIn);
        }
      }, 50);

      setIsPlaying(true);
      isInitializedRef.current = true;
      console.log('Continuous audio playback started');
      
    } catch (error) {
      console.error('Failed to start audio:', error);
    }
  };

  return {
    isPlaying,
    isLoaded,
    currentTrack: 0
  };
};