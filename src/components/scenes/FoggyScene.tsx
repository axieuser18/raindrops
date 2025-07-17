import React from 'react';
import { motion } from 'framer-motion';
import { EnhancedAnimations } from '../EnhancedAnimations';

export const FoggyScene: React.FC = () => {
  return (
    <EnhancedAnimations>
      <div className="rain-container foggy-scene">
        {/* Misty background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, 
              #2a2a3a 0%, 
              #3a3a4a 15%, 
              #4a4a5a 35%, 
              #3a3a4a 55%, 
              #2a2a3a 100%)`
          }}
          animate={{
            opacity: [0.7, 0.9, 0.8, 0.85],
            scale: [1, 1.03, 1.01, 1.02]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Multiple fog layers */}
        {Array.from({ length: 5 }, (_, layerIndex) => (
          <motion.div
            key={`fog-layer-${layerIndex}`}
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at ${20 + layerIndex * 15}% ${60 + layerIndex * 10}%, 
                  rgba(255, 255, 255, ${0.15 - layerIndex * 0.02}) 0%, 
                  transparent ${60 + layerIndex * 10}%),
                radial-gradient(ellipse at ${80 - layerIndex * 10}% ${30 + layerIndex * 15}%, 
                  rgba(200, 220, 240, ${0.12 - layerIndex * 0.015}) 0%, 
                  transparent ${70 + layerIndex * 5}%)
              `,
              zIndex: 5 + layerIndex
            }}
            animate={{
              opacity: [0.4 + layerIndex * 0.1, 0.8 - layerIndex * 0.05, 0.6 + layerIndex * 0.08],
              transform: [
                `translateX(${-10 + layerIndex * 5}px) scale(${1 + layerIndex * 0.02})`,
                `translateX(${20 - layerIndex * 3}px) scale(${1.05 - layerIndex * 0.01})`,
                `translateX(${-15 + layerIndex * 7}px) scale(${0.98 + layerIndex * 0.015})`
              ]
            }}
            transition={{
              duration: 25 + layerIndex * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: layerIndex * 2
            }}
          />
        ))}

        {/* Obscured city silhouette */}
        <motion.div 
          className="city-skyline"
          style={{ 
            filter: 'blur(2px) brightness(0.4) contrast(0.8)',
            opacity: 0.6
          }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 0.6 }}
          transition={{ duration: 4 }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={`foggy-building-${i + 1}`}
              className="absolute bottom-0"
              style={{
                left: `${10 + i * 10}%`,
                width: `${6 + Math.random() * 8}%`,
                height: `${30 + Math.random() * 40}%`,
                background: `linear-gradient(180deg, 
                  rgba(60, 60, 80, 0.7) 0%,
                  rgba(40, 40, 60, 0.8) 50%,
                  rgba(20, 20, 40, 0.9) 100%)`,
                clipPath: 'polygon(0 100%, 0 0, 100% 0, 100% 100%)'
              }}
              animate={{
                opacity: [0.4, 0.7, 0.5, 0.6],
                filter: [
                  'blur(2px) brightness(0.4)',
                  'blur(3px) brightness(0.3)',
                  'blur(2.5px) brightness(0.35)'
                ]
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                delay: i * 1.5
              }}
            />
          ))}

          {/* Dim, scattered lights */}
          <div className="city-lights">
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={`foggy-light-${i}`}
                className="absolute"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${40 + Math.random() * 30}%`,
                  width: '4px',
                  height: '4px',
                  background: 'rgba(255, 220, 120, 0.4)',
                  borderRadius: '50%',
                  boxShadow: '0 0 15px rgba(255, 220, 120, 0.3)',
                  filter: 'blur(1px)'
                }}
                animate={{ 
                  opacity: [0.2, 0.5, 0.3, 0.4],
                  scale: [0.8, 1.2, 1, 1.1],
                  boxShadow: [
                    '0 0 15px rgba(255, 220, 120, 0.3)',
                    '0 0 25px rgba(255, 220, 120, 0.2)',
                    '0 0 20px rgba(255, 220, 120, 0.25)'
                  ]
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 10
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Mysterious street lamps with halos */}
        <div className="street-lamps">
          {[25, 50, 75].map((position, index) => (
            <motion.div
              key={`foggy-lamp-${index}`}
              className="absolute bottom-1/4 z-20"
              style={{ left: `${position}%` }}
            >
              {/* Lamp post */}
              <div 
                className="w-1 h-20 bg-gray-700 opacity-60"
                style={{ filter: 'blur(0.5px)' }}
              />
              
              {/* Light with fog halo */}
              <motion.div
                className="absolute -top-3 -left-8 w-16 h-16 rounded-full"
                style={{
                  background: `radial-gradient(circle, 
                    rgba(255, 220, 120, 0.3) 0%,
                    rgba(255, 220, 120, 0.1) 30%,
                    rgba(255, 255, 255, 0.05) 60%,
                    transparent 100%)`,
                  filter: 'blur(2px)'
                }}
                animate={{
                  opacity: [0.6, 0.9, 0.7, 0.8],
                  scale: [1, 1.2, 1.1, 1.15]
                }}
                transition={{
                  duration: 6 + index,
                  repeat: Infinity,
                  delay: index * 2
                }}
              />
              
              {/* Core light */}
              <motion.div
                className="absolute -top-1 -left-1 w-2 h-2 rounded-full"
                style={{
                  background: 'rgba(255, 220, 120, 0.8)',
                  boxShadow: '0 0 10px rgba(255, 220, 120, 0.6)'
                }}
                animate={{
                  opacity: [0.7, 1, 0.8, 0.9],
                  scale: [0.8, 1.1, 0.9, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Gentle drizzle */}
        <div className="rain-layer z-30">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={`foggy-rain-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                width: '1px',
                height: '8px',
                background: 'linear-gradient(to bottom, rgba(200, 220, 240, 0.3) 0%, rgba(150, 180, 200, 0.2) 100%)',
                borderRadius: '0 0 50% 50%',
                filter: 'blur(0.5px)'
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: [0, 0.4, 0.3, 0],
                y: '110vh'
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                delay: Math.random() * 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Floating fog wisps */}
        <div className="absolute inset-0 z-25">
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={`wisp-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${10 + Math.random() * 20}px`,
                background: `rgba(255, 255, 255, ${0.1 + Math.random() * 0.1})`,
                filter: 'blur(3px)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                x: [0, 50, -30, 40, 0],
                y: [0, -20, 10, -15, 0],
                opacity: [0.1, 0.3, 0.2, 0.25, 0.1],
                scale: [1, 1.3, 0.8, 1.1, 1]
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 15
              }}
            />
          ))}
        </div>

        {/* Ground fog */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1/3 z-15"
          style={{
            background: `linear-gradient(to top, 
              rgba(255, 255, 255, 0.2) 0%,
              rgba(200, 220, 240, 0.15) 30%,
              rgba(150, 180, 200, 0.1) 60%,
              transparent 100%)`,
            filter: 'blur(2px)'
          }}
          animate={{
            opacity: [0.6, 0.9, 0.7, 0.8],
            transform: [
              'translateY(0px) scaleY(1)',
              'translateY(-10px) scaleY(1.1)',
              'translateY(5px) scaleY(0.95)',
              'translateY(-5px) scaleY(1.05)'
            ]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </EnhancedAnimations>
  );
};