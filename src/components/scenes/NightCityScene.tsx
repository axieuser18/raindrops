import React from 'react';
import { motion } from 'framer-motion';
import { EnhancedAnimations } from '../EnhancedAnimations';

export const NightCityScene: React.FC = () => {
  return (
    <EnhancedAnimations>
      <div className="rain-container night-city-scene">
        {/* Deep night background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, 
              #0a0a1f 0%, 
              #1a1a3e 15%, 
              #2a2a5e 35%, 
              #1a1a3e 55%, 
              #0a0a1f 100%)`
          }}
          animate={{
            opacity: [0.85, 0.95, 0.9, 0.92],
            scale: [1, 1.01, 0.99, 1.005]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Neon glow overlay */}
        <motion.div 
          className="absolute inset-0 z-5"
          style={{
            background: `
              radial-gradient(ellipse at 20% 60%, rgba(255, 0, 150, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 40%, rgba(0, 255, 255, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 80%, rgba(255, 255, 0, 0.06) 0%, transparent 70%)
            `
          }}
          animate={{
            opacity: [0.6, 0.8, 0.7, 0.75],
            transform: [
              'scale(1) rotate(0deg)',
              'scale(1.02) rotate(0.5deg)',
              'scale(0.98) rotate(-0.3deg)',
              'scale(1.01) rotate(0.2deg)'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Futuristic city skyline */}
        <motion.div 
          className="city-skyline"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 3 }}
        >
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={`night-building-${i + 1}`}
              className="absolute bottom-0"
              style={{
                left: `${5 + i * 6}%`,
                width: `${4 + Math.random() * 6}%`,
                height: `${40 + Math.random() * 50}%`,
                background: `linear-gradient(180deg, 
                  rgba(20, 20, 40, 0.9) 0%,
                  rgba(10, 10, 30, 0.95) 50%,
                  rgba(5, 5, 20, 1) 100%)`,
                clipPath: i % 3 === 0 
                  ? 'polygon(0 100%, 0 20%, 20% 15%, 80% 15%, 100% 20%, 100% 100%)'
                  : i % 3 === 1
                  ? 'polygon(0 100%, 0 10%, 50% 0, 100% 10%, 100% 100%)'
                  : 'polygon(0 100%, 0 0, 100% 0, 100% 100%)',
                boxShadow: `
                  inset 0 0 20px rgba(0, 0, 0, 0.7),
                  0 0 30px rgba(0, 0, 0, 0.9),
                  0 0 50px rgba(${Math.random() > 0.5 ? '255, 0, 150' : '0, 255, 255'}, 0.1)
                `
              }}
              animate={{
                boxShadow: [
                  `inset 0 0 20px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 0, 150, 0.1)`,
                  `inset 0 0 25px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 0, 0, 0.95), 0 0 60px rgba(0, 255, 255, 0.15)`,
                  `inset 0 0 20px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 255, 0, 0.1)`
                ]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}

          {/* Neon window lights */}
          <div className="city-lights">
            {Array.from({ length: 80 }, (_, i) => {
              const colors = [
                'rgba(255, 0, 150, 0.9)', // Magenta
                'rgba(0, 255, 255, 0.9)', // Cyan
                'rgba(255, 255, 0, 0.9)', // Yellow
                'rgba(0, 255, 0, 0.9)',   // Green
                'rgba(255, 100, 0, 0.9)'  // Orange
              ];
              const color = colors[Math.floor(Math.random() * colors.length)];
              
              return (
                <motion.div
                  key={`night-light-${i}`}
                  className="absolute"
                  style={{
                    left: `${15 + Math.random() * 70}%`,
                    top: `${20 + Math.random() * 50}%`,
                    width: `${3 + Math.random() * 2}px`,
                    height: `${4 + Math.random() * 3}px`,
                    background: color,
                    boxShadow: `
                      0 0 10px ${color},
                      0 0 20px ${color.replace('0.9', '0.5')},
                      0 0 30px ${color.replace('0.9', '0.2')}
                    `,
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px'
                  }}
                  animate={{ 
                    opacity: [0.7, 1, 0.8, 1, 0.6],
                    scale: [0.9, 1.1, 1, 1.2, 0.9],
                    boxShadow: [
                      `0 0 10px ${color}, 0 0 20px ${color.replace('0.9', '0.5')}`,
                      `0 0 15px ${color}, 0 0 30px ${color.replace('0.9', '0.7')}`,
                      `0 0 12px ${color}, 0 0 25px ${color.replace('0.9', '0.6')}`
                    ]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Holographic advertisements */}
        <div className="absolute inset-0 z-15">
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={`hologram-${i}`}
              className="absolute"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 10}%`,
                width: '120px',
                height: '60px',
                background: `linear-gradient(45deg, 
                  rgba(255, 0, 150, 0.3) 0%,
                  rgba(0, 255, 255, 0.3) 50%,
                  rgba(255, 255, 0, 0.3) 100%)`,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                backdropFilter: 'blur(2px)'
              }}
              animate={{
                opacity: [0.4, 0.8, 0.6, 0.9, 0.5],
                scale: [1, 1.05, 0.98, 1.02, 1],
                rotateY: [0, 5, -3, 2, 0]
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                delay: i * 3
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  background: `repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 2px,
                    rgba(255, 255, 255, 0.1) 2px,
                    rgba(255, 255, 255, 0.1) 4px
                  )`
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '20px 0px']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Flying vehicles */}
        <div className="absolute inset-0 z-20">
          {Array.from({ length: 4 }, (_, i) => (
            <motion.div
              key={`vehicle-${i}`}
              className="absolute"
              style={{
                width: '20px',
                height: '8px',
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, rgba(0, 255, 255, 0.6) 100%)',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)'
              }}
              initial={{
                x: '-50px',
                y: `${20 + i * 15}%`
              }}
              animate={{
                x: 'calc(100vw + 50px)',
                y: [`${20 + i * 15}%`, `${25 + i * 15}%`, `${15 + i * 15}%`, `${20 + i * 15}%`]
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 8
              }}
            >
              {/* Vehicle lights */}
              <motion.div
                className="absolute -left-1 top-1 w-2 h-2 rounded-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
                }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Light rain */}
        <div className="rain-layer z-30">
          {Array.from({ length: 25 }, (_, i) => (
            <motion.div
              key={`night-rain-${i}`}
              className="raindrop light"
              initial={{ opacity: 0, y: -50 }}
              animate={{ 
                opacity: [0, 0.6, 0.4, 0],
                y: '110vh'
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                delay: Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                background: 'linear-gradient(to bottom, rgba(173, 216, 230, 0.3) 0%, rgba(70, 130, 180, 0.2) 100%)'
              }}
            />
          ))}
        </div>

        {/* Atmospheric particles */}
        <div className="absolute inset-0 z-25">
          {Array.from({ length: 30 }, (_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: `rgba(${Math.random() > 0.5 ? '255, 0, 150' : '0, 255, 255'}, 0.6)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -20, -40, -60],
                x: [0, Math.random() * 20 - 10],
                opacity: [0.6, 0.8, 0.4, 0],
                scale: [0.5, 1, 1.2, 0.8]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 10
              }}
            />
          ))}
        </div>
      </div>
    </EnhancedAnimations>
  );
};