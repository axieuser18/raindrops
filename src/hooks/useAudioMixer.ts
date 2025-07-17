import { useEffect, useRef, useState } from 'react';

interface AudioMixerConfig {
  track1Volume: number;
  track2Volume: number;
  masterVolume: number;
  crossfadePosition: number; // 0 = full track1, 1 = full track2, 0.5 = equal mix
}

export const useAudioMixer = () => {
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);
  const gainNode1Ref = useRef<GainNode | null>(null);
  const gainNode2Ref = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [config, setConfig] = useState<AudioMixerConfig>({
    track1Volume: 0.7,
    track2Volume: 0.6,
    masterVolume: 0.8,
    crossfadePosition: 0.5
  });

  useEffect(() => {
    initializeAudioSystem();
    return cleanup;
  }, []);

  const initializeAudioSystem = async () => {
    try {
      // Create audio context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create audio elements
      audio1Ref.current = new Audio('/11L-medium_sound_raining-1752763639584.mp3');
      audio2Ref.current = new Audio('/11L-medium_sound_raining-1752764780047.mp3');
      
      // Configure audio properties
      [audio1Ref.current, audio2Ref.current].forEach(audio => {
        if (audio) {
          audio.loop = true;
          audio.preload = 'auto';
          audio.volume = 0; // We'll control volume through Web Audio API
        }
      });

      // Create Web Audio API nodes
      const context = audioContextRef.current;
      const source1 = context.createMediaElementSource(audio1Ref.current);
      const source2 = context.createMediaElementSource(audio2Ref.current);
      
      // Create gain nodes for individual tracks
      gainNode1Ref.current = context.createGain();
      gainNode2Ref.current = context.createGain();
      masterGainRef.current = context.createGain();
      
      // Create a compressor for professional sound
      const compressor = context.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-24, context.currentTime);
      compressor.knee.setValueAtTime(30, context.currentTime);
      compressor.ratio.setValueAtTime(12, context.currentTime);
      compressor.attack.setValueAtTime(0.003, context.currentTime);
      compressor.release.setValueAtTime(0.25, context.currentTime);
      
      // Create a subtle reverb effect
      const convolver = context.createConvolver();
      const impulseBuffer = createReverbImpulse(context, 2, 0.3);
      convolver.buffer = impulseBuffer;
      
      // Create a low-pass filter for warmth
      const lowPassFilter = context.createBiquadFilter();
      lowPassFilter.type = 'lowpass';
      lowPassFilter.frequency.setValueAtTime(8000, context.currentTime);
      lowPassFilter.Q.setValueAtTime(0.5, context.currentTime);
      
      // Connect the audio graph
      source1.connect(gainNode1Ref.current);
      source2.connect(gainNode2Ref.current);
      
      gainNode1Ref.current.connect(compressor);
      gainNode2Ref.current.connect(compressor);
      
      compressor.connect(convolver);
      convolver.connect(lowPassFilter);
      lowPassFilter.connect(masterGainRef.current);
      masterGainRef.current.connect(context.destination);
      
      // Set initial volumes
      updateMixerSettings(config);
      
      // Wait for both tracks to load
      await Promise.all([
        new Promise(resolve => {
          if (audio1Ref.current) {
            audio1Ref.current.addEventListener('canplaythrough', resolve, { once: true });
          }
        }),
        new Promise(resolve => {
          if (audio2Ref.current) {
            audio2Ref.current.addEventListener('canplaythrough', resolve, { once: true });
          }
        })
      ]);
      
      setIsLoaded(true);
      
      // Auto-start with smooth fade-in after 2 seconds
      setTimeout(() => {
        startMixedPlayback();
      }, 2000);
      
    } catch (error) {
      console.error('Audio initialization failed:', error);
    }
  };

  const createReverbImpulse = (context: AudioContext, duration: number, decay: number): AudioBuffer => {
    const sampleRate = context.sampleRate;
    const length = sampleRate * duration;
    const impulse = context.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const n = length - i;
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(n / length, decay);
      }
    }
    
    return impulse;
  };

  const updateMixerSettings = (newConfig: AudioMixerConfig) => {
    if (!gainNode1Ref.current || !gainNode2Ref.current || !masterGainRef.current) return;
    
    const context = audioContextRef.current;
    if (!context) return;
    
    const currentTime = context.currentTime;
    const fadeTime = 0.1; // Smooth transitions
    
    // Calculate crossfaded volumes
    const track1Gain = newConfig.track1Volume * (1 - newConfig.crossfadePosition);
    const track2Gain = newConfig.track2Volume * newConfig.crossfadePosition;
    
    // Apply smooth volume changes
    gainNode1Ref.current.gain.setTargetAtTime(track1Gain, currentTime, fadeTime);
    gainNode2Ref.current.gain.setTargetAtTime(track2Gain, currentTime, fadeTime);
    masterGainRef.current.gain.setTargetAtTime(newConfig.masterVolume, currentTime, fadeTime);
    
    setConfig(newConfig);
  };

  const startMixedPlayback = async () => {
    if (!audio1Ref.current || !audio2Ref.current || !audioContextRef.current) return;
    
    try {
      // Resume audio context if suspended
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      // Start both tracks simultaneously with smooth fade-in
      const fadeInDuration = 3;
      const currentTime = audioContextRef.current.currentTime;
      
      // Start with zero volume
      if (masterGainRef.current) {
        masterGainRef.current.gain.setValueAtTime(0, currentTime);
        masterGainRef.current.gain.linearRampToValueAtTime(config.masterVolume, currentTime + fadeInDuration);
      }
      
      // Synchronize playback start
      await Promise.all([
        audio1Ref.current.play(),
        audio2Ref.current.play()
      ]);
      
      setIsPlaying(true);
      
    } catch (error) {
      console.error('Playback failed:', error);
    }
  };

  const stopMixedPlayback = () => {
    if (!audio1Ref.current || !audio2Ref.current || !audioContextRef.current) return;
    
    const fadeOutDuration = 2;
    const currentTime = audioContextRef.current.currentTime;
    
    // Smooth fade-out
    if (masterGainRef.current) {
      masterGainRef.current.gain.setValueAtTime(config.masterVolume, currentTime);
      masterGainRef.current.gain.linearRampToValueAtTime(0, currentTime + fadeOutDuration);
    }
    
    // Stop playback after fade-out
    setTimeout(() => {
      audio1Ref.current?.pause();
      audio2Ref.current?.pause();
      setIsPlaying(false);
    }, fadeOutDuration * 1000);
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
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  // Dynamic mixing based on time for natural variation
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      const time = Date.now() / 1000;
      const variation = Math.sin(time * 0.1) * 0.1 + 0.5; // Slow oscillation between 0.4 and 0.6
      
      updateMixerSettings({
        ...config,
        crossfadePosition: variation,
        track1Volume: 0.7 + Math.sin(time * 0.05) * 0.1, // Subtle volume variation
        track2Volume: 0.6 + Math.cos(time * 0.07) * 0.1
      });
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, [isPlaying, config]);

  return {
    isPlaying,
    isLoaded,
    startMixedPlayback,
    stopMixedPlayback,
    updateMixerSettings,
    config
  };
};