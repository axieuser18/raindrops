import React from 'react';
import { motion } from 'framer-motion';
import { EnhancedAnimations } from '../EnhancedAnimations';

export const DawnScene: React.FC = () => {
  return (
    <EnhancedAnimations>
      <div className="rain-container dawn-scene">
        {/* Dawn sky gradient */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{
            background: `linear-gradient(135deg, 
              #1a1a2e 0%, 
              #2a2a4e 15%, 
              #3a3a6e 35%, 
              #2a2a4e 55%, 
              #1a1a2e 100%)`
          }}
          animate={{
            background: [
              `linear-gradient(135deg, 
                #1a1a2e 0%, 
                #2a2a4e 15%, 
                #3a3a6e 35%, 
                #2a2a4e 55%, 
                #1a1a2e 100%)`,
              `linear-gradient(135deg, 
                #4a3a5e 0%, 
                #6a4a7e 15%, 
                #8a5a9e 35%, 
                #6a4a7e 55%, 
                #4a3a5e 100%)`,
              `linear-gradient(135deg, 
                #8a6a9e 0%, 
                #aa7abe 15%, 
                #ca8ade 35%, 
                #aa7abe 55%, 
                #8a6a9e 100%)`,
              `linear-gradient(135deg, 
                #ffa07a 0%, 
                #ffb07a 15%, 
                #ffc07a 35%, 
                #ffb07a 55%, 
                #ffa07a 100%)`
            ],
            opacity: [0.8, 0.9, 0.95, 1]
          }}
          transition={{
            duration: 25,
            ease: "easeInOut"
          }}
        />

        {/* Rising sun */}
        <motion.div
          className="absolute z-10"
          style={{
            right: '10%',
            top: '60%',
            width: '80px',
            height: '80px',
            borderRadius: '50%'
          }}
          initial={{
            background: 'radial-gradient(circle, rgba(255, 200, 100, 0.3) 0%, transparent 70%)',
            top: '80%',
            opacity: 0
          }}
          animate={{
            background: [
              'radial-gradient(circle, rgba(255, 200, 100, 0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(255, 220, 120, 0.6) 0%, rgba(255, 180, 80, 0.3) 50%, transparent 70%)',
              'radial-gradient(circle, rgba(255, 240, 140, 0.8) 0%, rgba(255, 200, 100, 0.5) 50%, rgba(255, 160, 60, 0.2) 70%, transparent 100%)'
            ],
            top: ['80%', '70%', '60%', '50%'],
            opacity: [0, 0.6, 0.8, 1],
            scale: [0.5, 0.8, 1, 1.2],
            boxShadow: [
              '0 0 20px rgba(255, 200, 100, 0.3)',
              '0 0 40px rgba(255, 220, 120, 0.5)',
              '0 0 60px rgba(255, 240, 140, 0.7)',
              '0 0 80px rgba(255, 240, 140, 0.9)'
            ]
          }}
          transition={{
            duration: 25,
            ease: "easeOut"
          }}
        />

        {/* Sun rays */}
        <div className="absolute inset-0 z-5">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={`sun-ray-${i}`}
              className="absolute"
              style={{
                right: '10%',
                top: '50%',
                width: '2px',
                height: '200px',
                background: 'linear-gradient(to bottom, rgba(255, 240, 140, 0.4) 0%, transparent 100%)',
                transformOrigin: 'top center',
                transform: `rotate(${i * 45}deg)`
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{
                opacity: [0, 0.6, 0.8, 1],
                scaleY: [0, 0.5, 0.8, 1],
                rotate: [i * 45, i * 45 + 360]
              }}
              transition={{
                opacity: { duration: 20, delay: 5 },
                scaleY: { duration: 20, delay: 5 },
                rotate: { duration: 60, repeat: Infinity, ease: "linear" }
              }}
            />
          ))}
        </div>

        {/* Awakening city */}
        <motion.div 
          className="city-skyline"
          initial={{ filter: 'brightness(0.2) contrast(1.5)' }}
          animate={{
            filter: [
              'brightness(0.2) contrast(1.5)',
              'brightness(0.4) contrast(1.3)',
              'brightness(0.6) contrast(1.1)',
              'brightness(0.8) contrast(1)'
            ]
          }}
          transition={{ duration: 25 }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={`dawn-building-${i + 1}`}
              className="absolute bottom-0"
              style={{
                left: `${5 + i * 7}%`,
                width: `${4 + Math.random() * 6}%`,
                height: `${35 + Math.random() * 45}%`,
                clipPath: i % 3 === 0 
                  ? 'polygon(0 100%, 0 20%, 20% 15%, 80% 15%, 100% 20%, 100% 100%)'
                  : i % 3 === 1
                  ? 'polygon(0 100%, 0 10%, 50% 0, 100% 10%, 100% 100%)'
                  : 'polygon(0 100%, 0 0, 100% 0, 100% 100%)'
              }}
              initial={{
                background: 'linear-gradient(180deg, rgba(20, 20, 30, 0.9) 0%, rgba(10, 10, 20, 1) 100%)'
              }}
              animate={{
                background: [
                  'linear-gradient(180deg, rgba(20, 20, 30, 0.9) 0%, rgba(10, 10, 20, 1) 100%)',
                  'linear-gradient(180deg, rgba(40, 30, 50, 0.9) 0%, rgba(30, 20, 40, 1) 100%)',
                  'linear-gradient(180deg, rgba(60, 50, 70, 0.9) 0%, rgba(50, 40, 60, 1) 100%)',
                  'linear-gradient(180deg, rgba(100, 80, 90, 0.9) 0%, rgba(80, 60, 70, 1) 100%)'
                ]
              }}
              transition={{
                duration: 25,
                delay: i * 0.5
              }}
            />
          ))}

          {/* Gradually lighting windows */}
          <div className="city-lights">
            {Array.from({ length: 60 }, (_, i) => (
              <motion.div
                key={`dawn-light-${i}`}
                className="absolute"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${25 + Math.random() * 45}%`,
                  width: '3px',
                  height: '4px',
                  borderRadius: '1px'
                }}
                initial={{
                  background: 'rgba(255, 220, 120, 0.2)',
                  boxShadow: '0 0 5px rgba(255, 220, 120, 0.1)',
                  opacity: 0
                }}
                animate={{
                  background: [
                    'rgba(255, 220, 120, 0.2)',
                    'rgba(255, 230, 130, 0.5)',
                    'rgba(255, 240, 140, 0.7)',
                    'rgba(255, 250, 150, 0.9)'
                  ],
                  boxShadow: [
                    '0 0 5px rgba(255, 220, 120, 0.1)',
                    '0 0 10px rgba(255, 230, 130, 0.3)',
                    '0 0 15px rgba(255, 240, 140, 0.5)',
                    '0 0 20px rgba(255, 250, 150, 0.7)'
                  ],
                  opacity: [0, 0.3, 0.6, 1]
                }}
                transition={{
                  duration: 20,
                  delay: Math.random() * 15,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Morning birds */}
        <div className="absolute inset-0 z-20">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={`bird-${i}`}
              className="absolute"
              style={{
                width: '8px',
                height: '3px',
                background: 'rgba(0, 0, 0, 0.6)',
                clipPath: 'polygon(0 50%, 30% 0, 70% 0, 100% 50%, 70% 100%, 30% 100%)'
              }}
              initial={{
                x: '-20px',
                y: `${20 + Math.random() * 40}%`
              }}
              animate={{
                x: 'calc(100vw + 20px)',
                y: [
                  `${20 + Math.random() * 40}%`,
                  `${15 + Math.random() * 40}%`,
                  `${25 + Math.random() * 40}%`,
                  `${20 + Math.random() * 40}%`
                ],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 25 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 8 + 10
              }}
            />
          ))}
        </div>

        {/* Light morning drizzle */}
        <div className="rain-layer z-30">
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={`dawn-rain-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                width: '1px',
                height: '10px',
                borderRadius: '0 0 50% 50%'
              }}
              initial={{
                background: 'linear-gradient(to bottom, rgba(173, 216, 230, 0.2) 0%, rgba(135, 206, 235, 0.1) 100%)',
                opacity: 0,
                y: -20
              }}
              animate={{
                background: [
                  'linear-gradient(to bottom, rgba(173, 216, 230, 0.2) 0%, rgba(135, 206, 235, 0.1) 100%)',
                  'linear-gradient(to bottom, rgba(255, 240, 200, 0.3) 0%, rgba(255, 220, 180, 0.2) 100%)'
                ],
                opacity: [0, 0.4, 0.3, 0],
                y: '110vh'
              }}
              transition={{
                background: { duration: 20 },
                opacity: { duration: 5, times: [0, 0.2, 0.8, 1] },
                y: { duration: 5, ease: "linear" },
                delay: Math.random() * 10,
                repeat: Infinity
              }}
            />
          ))}
        </div>

        {/* Morning mist */}
        <motion.div 
          className="absolute inset-0 z-15"
          style={{
            background: `
              radial-gradient(ellipse at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, rgba(255, 240, 200, 0.08) 0%, transparent 70%),
              linear-gradient(180deg, rgba(255, 250, 220, 0.05) 0%, transparent 50%)
            `
          }}
          initial={{ opacity: 0.8 }}
          animate={{
            opacity: [0.8, 0.6, 0.4, 0.2],
            transform: [
              'translateX(0px) scale(1)',
              'translateX(20px) scale(1.05)',
              'translateX(-10px) scale(0.98)',
              'translateX(30px) scale(1.02)'
            ]
          }}
          transition={{
            duration: 25,
            ease: "easeInOut"
          }}
        />

        {/* Dewdrops on imaginary surfaces */}
        <div className="absolute inset-0 z-25">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={`dewdrop-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${60 + Math.random() * 30}%`,
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(173, 216, 230, 0.3) 100%)',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.4)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 1],
                scale: [0, 0.8, 1],
                boxShadow: [
                  '0 0 4px rgba(255, 255, 255, 0.4)',
                  '0 0 8px rgba(255, 240, 200, 0.6)',
                  '0 0 12px rgba(255, 250, 220, 0.8)'
                ]
              }}
              transition={{
                duration: 15,
                delay: Math.random() * 10 + 5
              }}
            />
          ))}
        </div>
      </div>
    </EnhancedAnimations>
  );
};