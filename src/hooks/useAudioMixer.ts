import { useEffect, useRef, useState } from 'react';

interface AudioMixerConfig {
  masterVolume: number;
  crossfadeDuration: number;
  preloadBuffer: number;
}

export const useAudioMixer = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBuffersRef = useRef<AudioBuffer[]>([]);
  const sourceNodesRef = useRef<AudioBufferSourceNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const masterGainRef = useRef<GainNode | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  
  const nextStartTimeRef = useRef<number>(0);
  const trackDurationRef = useRef<number>(0);
  const isInitializedRef = useRef(false);

  const config: AudioMixerConfig = {
    masterVolume: 0.6,
    crossfadeDuration: 1.5, // 1.5 seconds crossfade
    preloadBuffer: 0.1 // Start next track 0.1 seconds early
  };

  useEffect(() => {
    initializeWebAudioAPI();
    return cleanup;
  }, []);

  const initializeWebAudioAPI = async () => {
    try {
      // Create AudioContext for precise timing control
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create master gain node
      masterGainRef.current = audioContextRef.current.createGain();
      masterGainRef.current.connect(audioContextRef.current.destination);
      masterGainRef.current.gain.value = config.masterVolume;

      // Load and decode audio files
      await loadAudioBuffers();
      
      setIsLoaded(true);
      console.log('Web Audio API initialized for gapless playback');
      
      // Auto-start after a brief delay
      setTimeout(() => {
        startGaplessPlayback();
      }, 1000);
      
    } catch (error) {
      console.error('Web Audio API initialization failed:', error);
      // Fallback to HTML5 audio with improved gapless technique
      initializeFallbackAudio();
    }
  };

  const loadAudioBuffers = async () => {
    const audioFiles = [
      './11L-medium_sound_raining-1752763639584.mp3',
      './11L-medium_sound_raining-1752764780047.mp3'
    ];

    const buffers = await Promise.all(
      audioFiles.map(async (url) => {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return audioContextRef.current!.decodeAudioData(arrayBuffer);
      })
    );

    audioBuffersRef.current = buffers;
    trackDurationRef.current = buffers[0].duration;
    console.log(`Audio buffers loaded, duration: ${trackDurationRef.current}s`);
  };

  const createSourceNode = (bufferIndex: number, startTime: number, gainValue: number = 0): AudioBufferSourceNode => {
    if (!audioContextRef.current || !masterGainRef.current) {
      throw new Error('AudioContext not initialized');
    }

    const source = audioContextRef.current.createBufferSource();
    const gainNode = audioContextRef.current.createGain();
    
    source.buffer = audioBuffersRef.current[bufferIndex];
    source.connect(gainNode);
    gainNode.connect(masterGainRef.current);
    gainNode.gain.value = gainValue;
    
    // Store references
    sourceNodesRef.current.push(source);
    gainNodesRef.current.push(gainNode);
    
    // Schedule the source to start
    source.start(startTime);
    
    return source;
  };

  const scheduleNextTrack = (currentTime: number, trackIndex: number) => {
    const nextTrackIndex = (trackIndex + 1) % audioBuffersRef.current.length;
    const trackDuration = trackDurationRef.current;
    const crossfadeStart = nextStartTimeRef.current + trackDuration - config.crossfadeDuration;
    const nextTrackStart = nextStartTimeRef.current + trackDuration - config.preloadBuffer;

    // Create the next track source (starts silent)
    const nextSource = createSourceNode(nextTrackIndex, nextTrackStart, 0);
    const nextGainNode = gainNodesRef.current[gainNodesRef.current.length - 1];

    // Schedule crossfade
    scheduleCrossfade(crossfadeStart, nextGainNode, true); // Fade in next track
    
    // Schedule fade out of current track if there is one
    if (gainNodesRef.current.length >= 2) {
      const currentGainNode = gainNodesRef.current[gainNodesRef.current.length - 2];
      scheduleCrossfade(crossfadeStart, currentGainNode, false); // Fade out current track
    }

    // Update timing for next iteration
    nextStartTimeRef.current = nextTrackStart + config.preloadBuffer;
    
    // Schedule the next track after this one
    setTimeout(() => {
      if (isPlaying) {
        scheduleNextTrack(audioContextRef.current!.currentTime, nextTrackIndex);
        setCurrentTrack(nextTrackIndex);
      }
    }, (trackDuration - config.crossfadeDuration - 1) * 1000); // Schedule 1 second before crossfade
  };

  const scheduleCrossfade = (startTime: number, gainNode: GainNode, fadeIn: boolean) => {
    if (!audioContextRef.current) return;

    const currentTime = audioContextRef.current.currentTime;
    const actualStartTime = Math.max(startTime, currentTime);
    const endTime = actualStartTime + config.crossfadeDuration;

    if (fadeIn) {
      // Fade in: 0 -> 1
      gainNode.gain.setValueAtTime(0, actualStartTime);
      gainNode.gain.linearRampToValueAtTime(1, endTime);
    } else {
      // Fade out: current value -> 0
      gainNode.gain.setValueAtTime(gainNode.gain.value, actualStartTime);
      gainNode.gain.linearRampToValueAtTime(0, endTime);
    }
  };

  const startGaplessPlayback = async () => {
    if (!audioContextRef.current || audioBuffersRef.current.length === 0) return;

    try {
      // Resume AudioContext if suspended
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const currentTime = audioContextRef.current.currentTime;
      nextStartTimeRef.current = currentTime + 0.1; // Small delay to ensure smooth start

      // Start first track with fade-in
      const firstSource = createSourceNode(0, nextStartTimeRef.current, 0);
      const firstGainNode = gainNodesRef.current[gainNodesRef.current.length - 1];
      
      // Smooth fade-in for first track
      firstGainNode.gain.setValueAtTime(0, nextStartTimeRef.current);
      firstGainNode.gain.linearRampToValueAtTime(1, nextStartTimeRef.current + 2);

      // Update timing
      nextStartTimeRef.current += trackDurationRef.current - config.preloadBuffer;

      // Schedule the continuous loop
      setTimeout(() => {
        if (isPlaying) {
          scheduleNextTrack(currentTime, 0);
        }
      }, (trackDurationRef.current - config.crossfadeDuration - 1) * 1000);

      setIsPlaying(true);
      setCurrentTrack(0);
      isInitializedRef.current = true;
      
      console.log('Gapless playback started with Web Audio API');
      
    } catch (error) {
      console.error('Failed to start gapless playback:', error);
      initializeFallbackAudio();
    }
  };

  const stopGaplessPlayback = () => {
    // Stop all source nodes
    sourceNodesRef.current.forEach(source => {
      try {
        source.stop();
      } catch (e) {
        // Source might already be stopped
      }
    });

    // Clear arrays
    sourceNodesRef.current = [];
    gainNodesRef.current = [];
    
    setIsPlaying(false);
    isInitializedRef.current = false;
  };

  // Fallback HTML5 audio system with improved gapless technique
  const fallbackAudioRef = useRef<HTMLAudioElement[]>([]);
  const fallbackCurrentRef = useRef(0);
  const fallbackNextRef = useRef(1);

  const initializeFallbackAudio = async () => {
    console.log('Initializing fallback HTML5 audio system');
    
    // Create 5 audio instances for better gapless playback
    const audioFiles = [
      './11L-medium_sound_raining-1752763639584.mp3',
      './11L-medium_sound_raining-1752764780047.mp3'
    ];

    fallbackAudioRef.current = [];
    
    for (let i = 0; i < 5; i++) {
      const audio = new Audio(audioFiles[i % audioFiles.length]);
      audio.preload = 'auto';
      audio.volume = 0;
      
      // Critical: Set up for gapless playback
      audio.addEventListener('canplaythrough', () => {
        console.log(`Fallback audio ${i} ready`);
      });

      // Handle track ending with immediate transition
      audio.addEventListener('timeupdate', () => {
        if (audio.currentTime >= audio.duration - 0.5) { // 0.5 seconds before end
          prepareNextFallbackTrack(i);
        }
      });

      audio.addEventListener('ended', () => {
        transitionFallbackTrack(i);
      });

      fallbackAudioRef.current.push(audio);
    }

    // Load all tracks
    await Promise.all(
      fallbackAudioRef.current.map(audio => 
        new Promise<void>((resolve) => {
          if (audio.readyState >= 4) {
            resolve();
          } else {
            audio.addEventListener('canplaythrough', () => resolve(), { once: true });
          }
        })
      )
    );

    setIsLoaded(true);
    
    // Start fallback playback
    setTimeout(() => {
      startFallbackPlayback();
    }, 1000);
  };

  const prepareNextFallbackTrack = (currentIndex: number) => {
    const nextIndex = (currentIndex + 1) % fallbackAudioRef.current.length;
    const nextAudio = fallbackAudioRef.current[nextIndex];
    
    if (nextAudio && nextAudio.paused) {
      nextAudio.currentTime = 0;
      nextAudio.volume = 0;
      
      // Start next track silently
      nextAudio.play().then(() => {
        // Quick crossfade
        const fadeSteps = 20;
        const fadeInterval = 25; // 25ms steps
        let step = 0;
        
        const crossfade = setInterval(() => {
          step++;
          const progress = step / fadeSteps;
          
          // Fade out current, fade in next
          fallbackAudioRef.current[currentIndex].volume = 0.6 * (1 - progress);
          nextAudio.volume = 0.6 * progress;
          
          if (step >= fadeSteps) {
            clearInterval(crossfade);
            fallbackAudioRef.current[currentIndex].pause();
            fallbackAudioRef.current[currentIndex].currentTime = 0;
          }
        }, fadeInterval);
        
        fallbackCurrentRef.current = nextIndex;
      }).catch(console.error);
    }
  };

  const transitionFallbackTrack = (endedIndex: number) => {
    // Ensure smooth transition even if preparation failed
    const nextIndex = (endedIndex + 1) % fallbackAudioRef.current.length;
    const nextAudio = fallbackAudioRef.current[nextIndex];
    
    if (nextAudio && nextAudio.paused) {
      nextAudio.currentTime = 0;
      nextAudio.volume = 0.6;
      nextAudio.play().catch(console.error);
      fallbackCurrentRef.current = nextIndex;
    }
  };

  const startFallbackPlayback = () => {
    const firstAudio = fallbackAudioRef.current[0];
    if (!firstAudio) return;

    firstAudio.currentTime = 0;
    firstAudio.volume = 0;
    
    firstAudio.play().then(() => {
      // Smooth fade-in
      const fadeSteps = 40;
      const fadeInterval = 50;
      let step = 0;
      
      const fadeIn = setInterval(() => {
        step++;
        const progress = step / fadeSteps;
        firstAudio.volume = 0.6 * progress;
        
        if (step >= fadeSteps) {
          clearInterval(fadeIn);
        }
      }, fadeInterval);
      
      setIsPlaying(true);
      fallbackCurrentRef.current = 0;
      console.log('Fallback gapless playback started');
      
    }).catch(console.error);
  };

  const cleanup = () => {
    // Clean up Web Audio API
    sourceNodesRef.current.forEach(source => {
      try {
        source.stop();
        source.disconnect();
      } catch (e) {
        // Already stopped/disconnected
      }
    });
    
    gainNodesRef.current.forEach(gain => {
      try {
        gain.disconnect();
      } catch (e) {
        // Already disconnected
      }
    });

    if (masterGainRef.current) {
      masterGainRef.current.disconnect();
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    // Clean up fallback audio
    fallbackAudioRef.current.forEach(audio => {
      audio.pause();
      audio.src = '';
    });

    // Clear refs
    sourceNodesRef.current = [];
    gainNodesRef.current = [];
    fallbackAudioRef.current = [];
    audioContextRef.current = null;
    masterGainRef.current = null;
  };

  return {
    isPlaying,
    isLoaded,
    startMixedPlayback: audioContextRef.current ? startGaplessPlayback : startFallbackPlayback,
    stopMixedPlayback: audioContextRef.current ? stopGaplessPlayback : () => {
      fallbackAudioRef.current.forEach(audio => audio.pause());
      setIsPlaying(false);
    },
    config,
    currentTrack
  };
};