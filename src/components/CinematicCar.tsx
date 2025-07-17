import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export const CinematicCar: React.FC = () => {
  const carRef = useRef<HTMLDivElement>(null);
  const headlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carRef.current && headlightRef.current) {
      // Advanced car movement with realistic acceleration/deceleration
      const carTimeline = gsap.timeline({ repeat: -1 });
      
      carTimeline
        .set(carRef.current, { x: -200, scale: 0.8 })
        .to(carRef.current, {
          x: window.innerWidth * 0.2,
          scale: 0.9,
          duration: 3,
          ease: "power2.out"
        })
        .to(carRef.current, {
          x: window.innerWidth * 0.5,
          scale: 1.1,
          duration: 2,
          ease: "none"
        })
        .to(carRef.current, {
          x: window.innerWidth * 0.8,
          scale: 1,
          duration: 2,
          ease: "none"
        })
        .to(carRef.current, {
          x: window.innerWidth + 200,
          scale: 0.8,
          duration: 3,
          ease: "power2.in"
        });

      // Dynamic headlight flickering
      gsap.to(headlightRef.current, {
        opacity: 0.8,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, []);

  return (
    <motion.div
      ref={carRef}
      className="cinematic-car"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: 'absolute',
        bottom: '30%',
        zIndex: 10
      }}
    >
      {/* Enhanced car body with motion blur effect */}
      <motion.div
        className="car-body-enhanced"
        animate={{
          boxShadow: [
            '0 4px 20px rgba(0,0,0,0.5)',
            '0 6px 30px rgba(0,0,0,0.7)',
            '0 4px 20px rgba(0,0,0,0.5)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          width: '120px',
          height: '50px',
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)',
          borderRadius: '8px',
          position: 'relative'
        }}
      >
        {/* Dynamic headlights */}
        <motion.div
          ref={headlightRef}
          className="enhanced-headlight"
          style={{
            position: 'absolute',
            right: '5px',
            top: '15px',
            width: '12px',
            height: '12px',
            background: 'radial-gradient(circle, #fff 0%, #ffeb3b 70%, transparent 100%)',
            borderRadius: '50%',
            filter: 'blur(1px)'
          }}
          animate={{
            boxShadow: [
              '0 0 20px #ffeb3b, 0 0 40px #fff',
              '0 0 30px #ffeb3b, 0 0 60px #fff',
              '0 0 20px #ffeb3b, 0 0 40px #fff'
            ]
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        
        {/* Windshield with rain effect */}
        <motion.div
          className="windshield-rain"
          style={{
            position: 'absolute',
            top: '5px',
            left: '20px',
            width: '80px',
            height: '20px',
            background: 'linear-gradient(135deg, rgba(173,216,230,0.3) 0%, rgba(135,206,235,0.2) 100%)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
          animate={{
            background: [
              'linear-gradient(135deg, rgba(173,216,230,0.3) 0%, rgba(135,206,235,0.2) 100%)',
              'linear-gradient(135deg, rgba(173,216,230,0.5) 0%, rgba(135,206,235,0.4) 100%)',
              'linear-gradient(135deg, rgba(173,216,230,0.3) 0%, rgba(135,206,235,0.2) 100%)'
            ]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};