import React from 'react';
import { motion } from 'framer-motion';
import { EnhancedAnimations } from '../EnhancedAnimations';

export const ThunderstormScene: React.FC = () => {
  // Heavy rain with wind
  const createStormRain = (count: number, className: string) => {
    return Array.from({ length: count }, (_, i) => (
      <motion.div
        key={`storm-${className}-${i}`}
        className={`raindrop ${className}`}
        initial={{ opacity: 0, y: -50, x: 0 }}
        animate={{ 
          opacity: [0, 1, 0.8, 0],
          y: '110vh',
          x: [0, 30, 50, 70], // Wind effect
          scaleY: [0.8, 1.5, 1.8, 2]
        }}
        transition={{
          duration: 1 + Math.random() * 0.5,
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
  };

  return (
    <EnhancedAnimations>
      <div className="rain-container thunderstorm-scene">
        {/* Dark stormy background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, 
              #050510 0%, 
              #0a0a1a 15%, 
              #0f1428 35%, 
              #1a1a2e 55%, 
              #0a0a1a 75%, 
              #050510 100%)`
          }}
          animate={{
            opacity: [0.9, 1, 0.95, 1],
            scale: [1, 1.05, 1.02, 1.03]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Intense lightning flashes */}
        <motion.div 
          className="absolute inset-0 z-10"
          style={{
            background: 'radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)'
          }}
          animate={{
            opacity: [0, 0, 0, 1, 0, 0.8, 0, 0.6, 0, 0, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            times: [0, 0.7, 0.71, 0.72, 0.73, 0.74, 0.75, 0.76, 0.77, 0.9, 1]
          }}
        />

        {/* Secondary lightning */}
        <motion.div 
          className="absolute inset-0 z-10"
          style={{
            background: 'radial-gradient(ellipse at 80% 30%, rgba(173, 216, 230, 0.4) 0%, transparent 40%)'
          }}
          animate={{
            opacity: [0, 0, 0.9, 0, 0.7, 0, 0, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            times: [0, 0.6, 0.61, 0.62, 0.63, 0.64, 0.8, 1],
            delay: 3
          }}
        />

        {/* Dark city silhouette */}
        <motion.div 
          className="city-skyline"
          style={{ filter: 'brightness(0.3) contrast(1.5)' }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={`storm-building-${i + 1}`}
              className={`building building-${(i % 10) + 1}`}
              style={{
                background: 'linear-gradient(180deg, rgba(5, 5, 10, 0.95) 0%, rgba(0, 0, 5, 1) 100%)',
                height: `${40 + Math.random() * 60}%`
              }}
              animate={{
                boxShadow: [
                  'inset 0 0 20px rgba(0, 0, 0, 0.9)',
                  'inset 0 0 40px rgba(255, 255, 255, 0.1)',
                  'inset 0 0 20px rgba(0, 0, 0, 0.9)'
                ]
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2
              }}
            />
          ))}

          {/* Flickering emergency lights */}
          <div className="city-lights">
            {Array.from({ length: 30 }, (_, i) => (
              <motion.div
                key={`storm-light-${i}`}
                className="window-light"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${30 + Math.random() * 40}%`,
                  background: Math.random() > 0.7 
                    ? 'rgba(255, 100, 100, 0.9)' // Emergency red
                    : 'rgba(255, 220, 120, 0.6)'
                }}
                animate={{ 
                  opacity: [0.2, 1, 0.1, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.9, 1.1, 0.8]
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.3,
                  repeat: Infinity,
                  delay: Math.random() * 3
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Swaying street lamps */}
        <div className="street-lamps">
          {[20, 40, 60, 80].map((position, index) => (
            <motion.div
              key={`storm-lamp-${index}`}
              className="absolute bottom-1/4 w-1 h-16 bg-gray-800 z-20"
              style={{ left: `${position}%` }}
              animate={{
                rotateZ: [0, 3, -2, 4, -1, 0],
                transformOrigin: 'bottom center'
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="absolute -top-2 -left-2 w-5 h-5 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 220, 120, 0.8) 0%, transparent 70%)',
                  boxShadow: '0 0 15px rgba(255, 220, 120, 0.6)'
                }}
                animate={{
                  opacity: [0.6, 1, 0.4, 0.9],
                  scale: [0.8, 1.2, 0.9, 1.1]
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Heavy storm rain */}
        <div className="rain-layer z-30">
          {createStormRain(60, 'heavy')}
        </div>
        <div className="rain-layer z-30">
          {createStormRain(40, 'splash')}
        </div>

        {/* Wind-blown debris */}
        <div className="absolute inset-0 z-25">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={`debris-${i}`}
              className="absolute w-2 h-1 bg-gray-600 opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                x: [0, 200, 400],
                y: [0, 50, 100],
                rotate: [0, 180, 360],
                opacity: [0.6, 0.3, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        {/* Intense mist and fog */}
        <motion.div 
          className="absolute inset-0 z-20"
          style={{
            background: `
              radial-gradient(ellipse at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, rgba(173, 216, 230, 0.08) 0%, transparent 70%),
              linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
            `
          }}
          animate={{
            opacity: [0.4, 0.8, 0.6, 0.9],
            transform: [
              'translateX(0px) scale(1)',
              'translateX(30px) scale(1.1)',
              'translateX(-20px) scale(0.95)',
              'translateX(40px) scale(1.05)'
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </EnhancedAnimations>
  );
};