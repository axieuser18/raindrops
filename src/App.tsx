import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudioMixer } from './hooks/useAudioMixer';
import './RaindropBackground.css';

function App() {
  const [rainIntensity] = useState(1.0); // Fixed intensity for better performance
  const { isPlaying, isLoaded } = useAudioMixer();

  // Generate optimized raindrops with reduced count for performance
  const lightRaindrops = Array.from({ length: 40 }, (_, i) => (
    <motion.div
      key={`light-${i}`}
      className="raindrop light"
      initial={{ opacity: 0, y: -50 }}
      animate={{ 
        opacity: [0, 0.4, 0],
        y: '110vh',
        x: Math.random() * 15 - 7.5
      }}
      transition={{
        duration: 2.5 + Math.random() * 2,
        delay: Math.random() * 8,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        left: `${Math.random() * 100}%`,
        willChange: 'transform, opacity'
      }}
    />
  ));

  const mediumRaindrops = Array.from({ length: 30 }, (_, i) => (
    <motion.div
      key={`medium-${i}`}
      className="raindrop medium"
      initial={{ opacity: 0, y: -50 }}
      animate={{ 
        opacity: [0, 0.5, 0],
        y: '110vh',
        x: Math.random() * 12 - 6
      }}
      transition={{
        duration: 2 + Math.random() * 1.5,
        delay: Math.random() * 6,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        left: `${Math.random() * 100}%`,
        willChange: 'transform, opacity'
      }}
    />
  ));

  const heavyRaindrops = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={`heavy-${i}`}
      className="raindrop heavy"
      initial={{ opacity: 0, y: -50, scaleY: 0.8 }}
      animate={{ 
        opacity: [0, 0.6, 0],
        y: '110vh',
        x: Math.random() * 10 - 5,
        scaleY: [0.8, 1.2, 1.4]
      }}
      transition={{
        duration: 1.5 + Math.random() * 1,
        delay: Math.random() * 4,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        left: `${Math.random() * 100}%`,
        willChange: 'transform, opacity'
      }}
    />
  ));

  const splashDrops = Array.from({ length: 15 }, (_, i) => (
    <motion.div
      key={`splash-${i}`}
      className="raindrop splash"
      initial={{ opacity: 0, y: -50, scaleY: 0.9 }}
      animate={{ 
        opacity: [0, 0.7, 0],
        y: '110vh',
        x: Math.random() * 8 - 4,
        scaleY: [0.9, 1.4, 1.6]
      }}
      transition={{
        duration: 1.2 + Math.random() * 0.8,
        delay: Math.random() * 5,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        left: `${Math.random() * 100}%`,
        willChange: 'transform, opacity'
      }}
    />
  ));

  return (
    <div className="rain-container">
      {/* Optimized background with reduced animations */}
      <motion.div 
        className="rain-background"
        animate={{
          opacity: [0.8, 0.9, 0.85]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Simplified lightning effect */}
      <motion.div 
        className="lightning-layer"
        animate={{
          opacity: [0, 0, 0, 0.3, 0, 0.5, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          times: [0, 0.9, 0.91, 0.92, 0.93, 0.95, 1]
        }}
      />
      
      {/* Optimized city skyline */}
      <motion.div 
        className="city-skyline"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={`building-${i + 1}`}
            className={`building building-${i + 1}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.6 + i * 0.08,
              ease: "easeOut"
            }}
          />
        ))}
        
        {/* Reduced number of building lights for performance */}
        <div className="city-lights">
          {Array.from({ length: 30 }, (_, i) => (
            <motion.div
              key={`light-${i}`}
              className="window-light"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.6, 1, 0.8]
              }}
              transition={{
                duration: 10,
                delay: Math.random() * 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${35 + Math.random() * 35}%`,
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Optimized street and car */}
      <motion.div 
        className="street"
        initial={{ y: 30, opacity: 0 }}
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
            duration: 15,
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
            transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="car-wheel car-wheel-rear"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="headlight headlight-left"
            animate={{ 
              opacity: [0.9, 1, 0.95]
            }}
            transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="headlight headlight-right"
            animate={{ 
              opacity: [0.9, 1, 0.95]
            }}
            transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="taillight taillight-left" />
          <div className="taillight taillight-right" />
        </motion.div>
        
        {/* Simplified street reflections */}
        <div className="street-reflections">
          <motion.div 
            className="reflection car-reflection"
            animate={{
              x: ['-150px', '85vw', '70vw', '45vw', '25vw', '10vw', '-150px'],
              opacity: [0.15, 0.2, 0.25, 0.3, 0.25, 0.2, 0.15]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
      
      {/* Optimized cloud system */}
      <div className="clouds">
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={`cloud-${i + 1}`}
            className={`cloud cloud-${i + 1}`}
            initial={{ x: -200, opacity: 0 }}
            animate={{ 
              x: 'calc(100vw + 150px)',
              opacity: [0, 0.3, 0.3, 0]
            }}
            transition={{
              duration: 60 + i * 15,
              delay: -20 * i,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Optimized rain layers */}
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
      
      {/* Simplified atmospheric effects */}
      <motion.div 
        className="mist-layer"
        animate={{
          opacity: [0.4, 0.6, 0.5]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Reduced puddle effects */}
      <div className="puddle-effects">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`ripple-${i}`}
            className="rain-ripple"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1, 2],
              opacity: [0.8, 0.4, 0]
            }}
            transition={{
              duration: 4,
              delay: Math.random() * 4,
              repeat: Infinity,
              ease: "easeOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;