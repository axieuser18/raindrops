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
  const audio3Ref = useRef<HTMLAudioElement | null>(null); // Third track for seamless transitions
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const crossfadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
      // Create multiple instances of the same audio for seamless looping
      audio1Ref.current = new Audio('./11L-medium_sound_raining-1752763639584.mp3');
      audio2Ref.current = new Audio('./11L-medium_sound_raining-1752763639584.mp3');
      audio3Ref.current = new Audio('./11L-medium_sound_raining-1752764780047.mp3');
      
      // Configure audio properties for seamless playback
      [audio1Ref.current, audio2Ref.current, audio3Ref.current].forEach((audio, index) => {
        if (audio) {
          audio.loop = false; // We'll handle looping manually for seamless transitions
          audio.preload = 'auto';
          audio.volume = 0;
          audio.crossOrigin = 'anonymous';
          
          // Add event listeners for seamless transitions
          audio.addEventListener('timeupdate', () => handleTimeUpdate(audio, index));
          audio.addEventListener('ended', () => handleTrackEnd(index));
          
          // Prevent any gaps by ensuring smooth playback
          audio.addEventListener('canplaythrough', () => {
            console.log(`Track ${index + 1} ready for seamless playback`);
          });
        }
      });

      // Load all tracks
      await Promise.all([
        loadAudioTrack(audio1Ref.current),
        loadAudioTrack(audio2Ref.current),
        loadAudioTrack(audio3Ref.current)
      ]);
      
      setIsLoaded(true);
      console.log('All audio tracks loaded for seamless playback');
      
      // Auto-start with smooth fade-in
      setTimeout(() => {
        startSeamlessPlayback();
      }, 2000);
      
    } catch (error) {
      console.error('Audio initialization failed:', error);
      fallbackAudioPlay();
    }
  };

  const loadAudioTrack = (audio: HTMLAudioElement | null): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!audio) {
        reject(new Error('Audio element not found'));
        return;
      }
      
      const handleLoad = () => {
        audio.removeEventListener('canplaythrough', handleLoad);
        audio.removeEventListener('error', handleError);
        resolve();
      };
      
      const handleError = () => {
        audio.removeEventListener('canplaythrough', handleLoad);
        audio.removeEventListener('error', handleError);
        reject(new Error('Failed to load audio'));
      };
      
      audio.addEventListener('canplaythrough', handleLoad, { once: true });
      audio.addEventListener('error', handleError, { once: true });
      audio.load();
    });
  };

  const handleTimeUpdate = (audio: HTMLAudioElement, trackIndex: number) => {
    if (!isPlaying) return;
    
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const timeRemaining = duration - currentTime;
    
    // Start crossfade 3 seconds before track ends
    if (timeRemaining <= 3 && timeRemaining > 2.8) {
      prepareNextTrack(trackIndex);
    }
  };

  const handleTrackEnd = (trackIndex: number) => {
    console.log(`Track ${trackIndex + 1} ended, transitioning seamlessly`);
    transitionToNextTrack();
  };

  const prepareNextTrack = (currentTrackIndex: number) => {
    const tracks = [audio1Ref.current, audio2Ref.current, audio3Ref.current];
    const nextTrackIndex = (currentTrackIndex + 1) % tracks.length;
    const nextTrack = tracks[nextTrackIndex];
    
    if (nextTrack && nextTrack.paused) {
      // Reset and prepare next track
      nextTrack.currentTime = 0;
      nextTrack.volume = 0;
      
      // Start next track silently
      nextTrack.play().then(() => {
        // Begin crossfade
        startCrossfade(tracks[currentTrackIndex], nextTrack);
        setCurrentTrack(nextTrackIndex);
      }).catch(console.error);
    }
  };

  const startCrossfade = (currentAudio: HTMLAudioElement | null, nextAudio: HTMLAudioElement | null) => {
    if (!currentAudio || !nextAudio) return;
    
    const crossfadeDuration = 2000; // 2 seconds
    const steps = 40; // 50ms intervals
    const stepDuration = crossfadeDuration / steps;
    let step = 0;
    
    const currentStartVolume = currentAudio.volume;
    const nextStartVolume = 0;
    const targetVolume = 0.6;
    
    const crossfadeInterval = setInterval(() => {
      step++;
      const progress = step / steps;
      
      // Smooth crossfade curve
      const fadeOutVolume = currentStartVolume * (1 - progress);
      const fadeInVolume = targetVolume * progress;
      
      currentAudio.volume = Math.max(0, fadeOutVolume);
      nextAudio.volume = Math.min(targetVolume, fadeInVolume);
      
      if (step >= steps) {
        clearInterval(crossfadeInterval);
        // Ensure clean transition
        currentAudio.pause();
        currentAudio.currentTime = 0;
        nextAudio.volume = targetVolume;
      }
    }, stepDuration);
  };

  const transitionToNextTrack = () => {
    const tracks = [audio1Ref.current, audio2Ref.current, audio3Ref.current];
    const nextTrackIndex = (currentTrack + 1) % tracks.length;
    const nextTrack = tracks[nextTrackIndex];
    
    if (nextTrack && nextTrack.paused) {
      nextTrack.currentTime = 0;
      nextTrack.volume = 0.6;
      nextTrack.play().catch(console.error);
      setCurrentTrack(nextTrackIndex);
    }
  };

  const startSeamlessPlayback = async () => {
    if (!audio1Ref.current) return;
    
    try {
      // Start with the first track
      audio1Ref.current.currentTime = 0;
      audio1Ref.current.volume = 0;
      
      await audio1Ref.current.play();
      
      // Smooth fade-in over 2 seconds
      const fadeInDuration = 2000;
      const steps = 40;
      const stepDuration = fadeInDuration / steps;
      let step = 0;
      const targetVolume = 0.6;
      
      const fadeIn = setInterval(() => {
        step++;
        const progress = step / steps;
        const volume = targetVolume * progress;
        
        if (audio1Ref.current) {
          audio1Ref.current.volume = Math.min(targetVolume, volume);
        }
        
        if (step >= steps) {
          clearInterval(fadeIn);
        }
      }, stepDuration);
      
      setIsPlaying(true);
      setCurrentTrack(0);
      console.log('Seamless audio playback started');
      
    } catch (error) {
      console.error('Seamless playback failed:', error);
      fallbackAudioPlay();
    }
  };

  const fallbackAudioPlay = () => {
    if (audio1Ref.current) {
      audio1Ref.current.loop = true;
      audio1Ref.current.volume = 0.6;
      audio1Ref.current.play().catch(console.error);
      setIsPlaying(true);
      setIsLoaded(true);
    }
  };

  const stopSeamlessPlayback = () => {
    const tracks = [audio1Ref.current, audio2Ref.current, audio3Ref.current];
    
    // Find currently playing track
    const playingTrack = tracks.find(track => track && !track.paused);
    
    if (playingTrack) {
      const fadeOutDuration = 1500;
      const steps = 30;
      const stepDuration = fadeOutDuration / steps;
      let step = 0;
      const startVolume = playingTrack.volume;
      
      const fadeOut = setInterval(() => {
        step++;
        const progress = step / steps;
        const volume = startVolume * (1 - progress);
        
        playingTrack.volume = Math.max(0, volume);
        
        if (step >= steps) {
          clearInterval(fadeOut);
          tracks.forEach(track => {
            if (track) {
              track.pause();
              track.currentTime = 0;
            }
          });
          setIsPlaying(false);
        }
      }, stepDuration);
    }
    
    if (crossfadeTimeoutRef.current) {
      clearTimeout(crossfadeTimeoutRef.current);
    }
  };

  const cleanup = () => {
    const tracks = [audio1Ref.current, audio2Ref.current, audio3Ref.current];
    
    tracks.forEach(track => {
      if (track) {
        track.pause();
        track.removeEventListener('timeupdate', () => {});
        track.removeEventListener('ended', () => {});
        track.removeEventListener('canplaythrough', () => {});
        track.removeEventListener('error', () => {});
      }
    });
    
    audio1Ref.current = null;
    audio2Ref.current = null;
    audio3Ref.current = null;
    
    if (crossfadeTimeoutRef.current) {
      clearTimeout(crossfadeTimeoutRef.current);
    }
  };

  // Dynamic volume variation for natural feel
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      const tracks = [audio1Ref.current, audio2Ref.current, audio3Ref.current];
      const playingTrack = tracks.find(track => track && !track.paused);
      
      if (playingTrack) {
        const time = Date.now() / 1000;
        const baseVolume = 0.6;
        const variation = Math.sin(time * 0.05) * 0.1; // Subtle variation
        const newVolume = Math.max(0.4, Math.min(0.8, baseVolume + variation));
        
        // Smooth volume transition
        const currentVolume = playingTrack.volume;
        const volumeDiff = newVolume - currentVolume;
        playingTrack.volume = currentVolume + (volumeDiff * 0.1); // Gradual change
      }
    }, 200); // Update every 200ms for smooth transitions
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  return {
    isPlaying,
    isLoaded,
    startMixedPlayback: startSeamlessPlayback,
    stopMixedPlayback: stopSeamlessPlayback,
    config,
    currentTrack
  };
};