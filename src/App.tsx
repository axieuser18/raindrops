import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AdvancedRainSystem } from './components/AdvancedRainSystem';
import { ParticleSystem } from './components/ParticleSystem';
import { AudioControls } from './components/AudioControls';
import { useAudioManager } from './hooks/useAudioManager';
import './RaindropBackground.css';

function App() {
  const [rainIntensity, setRainIntensity] = useState(1.2);
  const [windStrength, setWindStrength] = useState(0.7);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

  // Audio files
  const audioFiles = [
    '/11L-medium_sound_raining-1752763639584.mp3',
    '/11L-medium_sound_raining-1752764780047.mp3'
  ];

  const audioManager = useAudioManager(audioFiles[currentAudioIndex], {
    volume: 0.6,
    loop: true,
    fadeInDuration: 3000,
    fadeOutDuration: 2000
  });

  // Auto-start audio after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioManager.isLoaded) {
        audioManager.play();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [audioManager.isLoaded]);

  // Dynamic weather intensity changes
  useEffect(() => {
    const intensityInterval = setInterval(() => {
      setRainIntensity(prev => {
        const change = (Math.random() - 0.5) * 0.3;
        return Math.max(0.5, Math.min(2, prev + change));
      });
      
      setWindStrength(prev => {
        const change = (Math.random() - 0.5) * 0.2;
        return Math.max(0.2, Math.min(1.2, prev + change));
      });
    }, 8000);

    return () => clearInterval(intensityInterval);
  }, []);

  const handleTogglePlay = () => {
    if (audioManager.isPlaying) {
      audioManager.pause();
    } else {
      audioManager.play();
    }
  };

  const handleVolumeChange = (volume: number) => {
    audioManager.setVolume(volume);
  };

  const switchAudioTrack = () => {
    audioManager.stop();
    setTimeout(() => {
      setCurrentAudioIndex(prev => (prev + 1) % audioFiles.length);
    }, 500);
  };

  // Generate multiple layers of raindrops with varying properties
  const lightRaindrops = Array.from({ length: Math.floor(80 * rainIntensity) }, (_, i) => (
    <motion.div
      key={`light-${i}`}
      className="raindrop light"
      initial={{ opacity: 0, y: -50 }}
      animate={{ 
        opacity: [0, 0.3 + Math.random() * 0.3, 0],
        y: '110vh',
        x: Math.random() * 20 - 10
      }}
      transition={{
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 6,
        repeat: Infinity,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{
        left: `${Math.random() * 100}%`,
        transform: `rotate(${-5 + Math.random() * 10}deg)`,
      }}
    />
  ));

  const mediumRaindrops = Array.from({ length: Math.floor(60 * rainIntensity) }, (_, i) => (
    <motion.div
      key={`medium-${i}`}
      className="raindrop medium"
      initial={{ opacity: 0, y: -50 }}
      animate={{ 
        opacity: [0, 0.4 + Math.random() * 0.3, 0],
        y: '110vh',
        x: Math.random() * 15 - 7.5
      }}
      transition={{
        duration: 1.5 + Math.random() * 2,
        delay: Math.random() * 4,
        repeat: Infinity,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{
        left: `${Math.random() * 100}%`,
        transform: `rotate(${-3 + Math.random() * 6}deg)`,
      }}
    />
  ));

  const heavyRaindrops = Array.from({ length: Math.floor(40 * rainIntensity) }, (_, i) => (
    <motion.div
      key={`heavy-${i}`}
      className="raindrop heavy"
      initial={{ opacity: 0, y: -50, scaleY: 0.6 }}
      animate={{ 
        opacity: [0, 0.5 + Math.random() * 0.3, 0],
        y: '110vh',
        x: Math.random() * 12 - 6,
        scaleY: [0.6, 1.4, 1.6]
      }}
      transition={{
        duration: 1 + Math.random() * 1.5,
        delay: Math.random() * 3,
        repeat: Infinity,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{
        left: `${Math.random() * 100}%`,
        transform: `rotate(${-2 + Math.random() * 4}deg)`,
      }}
    />
  ));

  const splashDrops = Array.from({ length: Math.floor(25 * rainIntensity) }, (_, i) => (
    <motion.div
      key={`splash-${i}`}
      className="raindrop splash"
      initial={{ opacity: 0, y: -50, scaleY: 0.8 }}
      animate={{ 
        opacity: [0, 0.6 + Math.random() * 0.3, 0],
        y: '110vh',
        x: Math.random() * 10 - 5,
        scaleY: [0.8, 1.6, 1.8]
      }}
      transition={{
        duration: 0.8 + Math.random() * 1.2,
        delay: Math.random() * 4,
        repeat: Infinity,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{
        left: `${Math.random() * 100}%`,
      }}
    />
  ));

  return (
    <div className="rain-container">
      {/* Dynamic background with lightning effects */}
      <motion.div 
        className="rain-background"
        animate={{
          opacity: [0.8, 0.9, 1, 0.85],
          scale: [1, 1.02, 1.05, 1.01]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="lightning-layer"
        animate={{
          opacity: [0, 0, 0, 0.4, 0, 0.7, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          times: [0, 0.9, 0.91, 0.92, 0.93, 0.95, 1]
        }}
      />
      
      {/* City skyline with enhanced animations */}
      <motion.div 
        className="city-skyline"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={`building-${i + 1}`}
            className={`building building-${i + 1}`}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1.5, 
              delay: 0.8 + i * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          />
        ))}
        
        {/* Building windows with enhanced lights */}
        <div className="city-lights">
          {Array.from({ length: 60 }, (_, i) => (
            <motion.div
              key={`light-${i}`}
              className="window-light"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.6, 1, 0.8, 0.9],
                scale: [1, 1.1, 0.9, 1]
              }}
              transition={{
                duration: 8,
                delay: Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${30 + Math.random() * 40}%`,
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Enhanced street and car */}
      <motion.div 
        className="street"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <div className="road" />
        <motion.div 
          className="car moving-car"
          animate={{
            x: ['-150px', '85vw', '70vw', '45vw', '25vw', '10vw', '-150px'],
            scale: [0.8, 0.9, 1, 1.1, 1, 0.9, 0.8]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1]
          }}
        >
          <div className="car-body" />
          <div className="car-roof" />
          <div className="car-windshield" />
          <motion.div 
            className="car-wheel car-wheel-front"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="car-wheel car-wheel-rear"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="headlight headlight-left"
            animate={{ 
              opacity: [0.9, 1, 0.95, 1],
              scale: [1, 1.05, 0.98, 1]
            }}
            transition={{ duration: 0.1, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="headlight headlight-right"
            animate={{ 
              opacity: [0.9, 1, 0.95, 1],
              scale: [1, 1.05, 0.98, 1]
            }}
            transition={{ duration: 0.1, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="taillight taillight-left" />
          <div className="taillight taillight-right" />
        </motion.div>
        
        {/* Enhanced street reflections */}
        <div className="street-reflections">
          <motion.div 
            className="reflection car-reflection"
            animate={{
              x: ['-150px', '85vw', '70vw', '45vw', '25vw', '10vw', '-150px'],
              opacity: [0.2, 0.25, 0.3, 0.35, 0.3, 0.25, 0.2]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={`light-reflection-${i + 1}`}
              className={`reflection light-reflection-${i + 1}`}
              animate={{
                x: [`${-40 + i * 10}px`, `${83 - i * 2}vw`, `${68 - i * 2}vw`, `${43 - i * 2}vw`, `${23 - i * 2}vw`, `${8 - i * 2}vw`, `${-40 + i * 10}px`],
                opacity: [0, 0.3 + i * 0.1, 0.4 + i * 0.1, 0.5 + i * 0.1, 0.4 + i * 0.1, 0.3 + i * 0.1, 0]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Enhanced cloud system */}
      <div className="clouds">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`cloud-${i + 1}`}
            className={`cloud cloud-${i + 1}`}
            initial={{ x: -200, opacity: 0 }}
            animate={{ 
              x: 'calc(100vw + 150px)',
              opacity: [0, 0.4, 0.4, 0]
            }}
            transition={{
              duration: 45 + i * 10,
              delay: -15 * i,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Advanced Rain System */}
      <AdvancedRainSystem intensity={rainIntensity} windStrength={windStrength} />
      
      {/* Original rain layers with Framer Motion */}
      <div className="rain-layer background-rain">
        {lightRaindrops}
      </div>
      
      <div className="rain-layer medium-rain">
        {mediumRaindrops}
      </div>
      
      <div className="rain-layer foreground-rain">
        {heavyRaindrops}
      </div>
      
      <div className="rain-layer splash-rain">
        {splashDrops}
      </div>
      
      {/* Particle System */}
      <ParticleSystem />
      
      {/* Enhanced atmospheric effects */}
      <motion.div 
        className="mist-layer"
        animate={{
          opacity: [0.6, 0.8, 0.7, 0.9],
          x: [0, 10, -5, 15],
          scale: [1, 1.05, 0.98, 1.02]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="wind-effect"
        animate={{
          x: [0, 5, -3, 8],
          skewX: [0, 1, -0.5, 1.5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Enhanced rain puddle effects */}
      <div className="puddle-effects">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={`ripple-${i}`}
            className="rain-ripple"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1, 2, 3],
              opacity: [1, 0.6, 0.3, 0]
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Audio Controls */}
      <AudioControls
        isPlaying={audioManager.isPlaying}
        volume={audioManager.volume}
        onTogglePlay={handleTogglePlay}
        onVolumeChange={handleVolumeChange}
        isLoaded={audioManager.isLoaded}
      />

      {/* Track Switch Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={switchAudioTrack}
        className="fixed bottom-8 left-8 bg-black/30 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/10 text-white/80 text-sm hover:bg-white/20 transition-colors"
        style={{ zIndex: 100 }}
      >
        Switch Track ({currentAudioIndex + 1}/2)
      </motion.button>

      {/* Weather Info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="fixed top-8 left-8 bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-white/80"
        style={{ zIndex: 100 }}
      >
        <div className="text-sm space-y-1">
          <div>Rain Intensity: {(rainIntensity * 100).toFixed(0)}%</div>
          <div>Wind Strength: {(windStrength * 100).toFixed(0)}%</div>
          <div className="text-xs text-white/60 mt-2">
            Dynamic weather simulation
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;