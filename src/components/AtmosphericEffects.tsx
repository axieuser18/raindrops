import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export const AtmosphericEffects: React.FC = () => {
  const lightningRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lightningRef.current) {
      // Advanced lightning system
      const lightningTimeline = gsap.timeline({ repeat: -1 });
      
      lightningTimeline
        .set(lightningRef.current, { opacity: 0 })
        .to(lightningRef.current, { opacity: 0.8, duration: 0.1 }, "15")
        .to(lightningRef.current, { opacity: 0, duration: 0.1 })
        .to(lightningRef.current, { opacity: 0.9, duration: 0.05 }, "+=0.1")
        .to(lightningRef.current, { opacity: 0, duration: 0.1 })
        .to(lightningRef.current, { opacity: 1, duration: 0.05 }, "+=0.05")
        .to(lightningRef.current, { opacity: 0, duration: 0.2 });
    }

    if (mistRef.current) {
      // Dynamic mist movement
      gsap.to(mistRef.current, {
        x: 20,
        y: -10,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  return (
    <>
      {/* Enhanced Lightning */}
      <motion.div
        ref={lightningRef}
        className="enhanced-lightning"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at 50% 10%, rgba(255,255,255,0.4) 0%, rgba(173,216,230,0.2) 30%, transparent 60%)',
          zIndex: 15,
          pointerEvents: 'none'
        }}
        animate={{
          background: [
            'radial-gradient(ellipse at 50% 10%, rgba(255,255,255,0.4) 0%, rgba(173,216,230,0.2) 30%, transparent 60%)',
            'radial-gradient(ellipse at 30% 15%, rgba(255,255,255,0.6) 0%, rgba(173,216,230,0.3) 25%, transparent 50%)',
            'radial-gradient(ellipse at 70% 5%, rgba(255,255,255,0.5) 0%, rgba(173,216,230,0.25) 35%, transparent 70%)'
          ]
        }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 8 }}
      />

      {/* Enhanced Atmospheric Mist */}
      <motion.div
        ref={mistRef}
        className="enhanced-mist"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '120%',
          height: '100%',
          background: `
            radial-gradient(ellipse at 20% 70%, rgba(255,255,255,0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 30%, rgba(173,216,230,0.08) 0%, transparent 70%),
            radial-gradient(ellipse at 50% 90%, rgba(135,206,235,0.06) 0%, transparent 80%)
          `,
          filter: 'blur(2px)',
          mixBlendMode: 'soft-light',
          zIndex: 8,
          pointerEvents: 'none'
        }}
        animate={{
          opacity: [0.6, 0.9, 0.7, 0.8],
          scale: [1, 1.05, 0.98, 1.02]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particle System */}
      <div className="particle-system" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 7 }}>
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'rgba(173,216,230,0.4)',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>
    </>
  );
};