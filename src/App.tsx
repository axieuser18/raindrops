import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedRain } from './components/AnimatedRain';
import { CinematicCar } from './components/CinematicCar';
import { DynamicCityscape } from './components/DynamicCityscape';
import { AtmosphericEffects } from './components/AtmosphericEffects';
import './RaindropBackground.css';

function App() {
  return (
    <motion.div 
      className="rain-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Enhanced Dynamic Background */}
      <motion.div 
        className="rain-background"
        animate={{
          background: [
            'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 15%, #16213e 35%, #0f3460 55%, #1a1a2e 75%, #0a0a0f 100%)',
            'linear-gradient(135deg, #0f0f14 0%, #1f1f33 15%, #1b2843 35%, #143565 55%, #1f1f33 75%, #0f0f14 100%)',
            'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 15%, #16213e 35%, #0f3460 55%, #1a1a2e 75%, #0a0a0f 100%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Atmospheric Effects */}
      <AtmosphericEffects />
      
      {/* Dynamic Cityscape */}
      <DynamicCityscape />
      
      {/* Enhanced Street */}
      <motion.div 
        className="street"
        style={{ position: 'absolute', bottom: 0, width: '100%', height: '25%', zIndex: 3 }}
      >
        <motion.div
          className="road"
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(30,30,35,0.9) 0%, rgba(20,20,25,0.95) 30%, rgba(15,15,20,1) 70%, rgba(10,10,15,1) 100%)',
            borderTop: '2px solid rgba(60,60,70,0.6)'
          }}
          animate={{
            boxShadow: [
              'inset 0 10px 30px rgba(0,0,0,0.5)',
              'inset 0 15px 40px rgba(0,0,0,0.7)',
              'inset 0 10px 30px rgba(0,0,0,0.5)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Street Reflections */}
        <div className="street-reflections" style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', opacity: 0.4 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: `${10 + Math.random() * 20}px`,
                height: '3px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(173,216,230,0.3) 50%, transparent 100%)',
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 50}%`,
                borderRadius: '2px'
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scaleX: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Cinematic Car */}
      <CinematicCar />
      
      {/* Professional Rain System */}
      <AnimatedRain />
      
      {/* Enhanced Clouds */}
      <div className="clouds" style={{ position: 'absolute', top: 0, width: '100%', height: '100%', zIndex: 1 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="cloud"
            style={{
              position: 'absolute',
              width: `${80 + Math.random() * 60}px`,
              height: `${30 + Math.random() * 20}px`,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '100px',
              top: `${10 + Math.random() * 50}%`,
              left: '-100px',
              filter: 'blur(1px)'
            }}
            animate={{
              x: window.innerWidth + 200,
              opacity: [0, 0.6, 0.4, 0]
            }}
            transition={{
              duration: 30 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Rain Puddle Effects */}
      <div className="puddle-effects" style={{ position: 'absolute', bottom: 0, width: '100%', height: '25%', zIndex: 6 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              bottom: '10%',
              left: `${Math.random() * 100}%`,
              width: '0px',
              height: '0px',
              border: '2px solid rgba(173,216,230,0.5)',
              borderRadius: '50%'
            }}
            animate={{
              width: ['0px', '40px', '60px'],
              height: ['0px', '40px', '60px'],
              opacity: [1, 0.6, 0],
              borderWidth: ['3px', '2px', '1px']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default App;