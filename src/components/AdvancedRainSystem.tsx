import React, { useEffect, useRef, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';

interface RaindropProps {
  id: number;
  type: 'light' | 'medium' | 'heavy' | 'splash';
  delay: number;
  duration: number;
  x: number;
  intensity: number;
}

const AdvancedRaindrop: React.FC<RaindropProps> = ({ id, type, delay, duration, x, intensity }) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (dropRef.current) {
      const tl = gsap.timeline({ repeat: -1, delay });
      
      // Advanced physics-based animation
      tl.set(dropRef.current, {
        y: -50,
        x: x + '%',
        scaleY: 0.6,
        opacity: 0,
        rotation: Math.random() * 10 - 5,
      })
      .to(dropRef.current, {
        y: '100vh',
        scaleY: 1.4,
        opacity: intensity,
        rotation: Math.random() * 20 - 10,
        duration: duration,
        ease: 'power2.in',
        onComplete: () => {
          // Splash effect on impact
          if (type === 'splash') {
            gsap.to(dropRef.current, {
              scaleX: 3,
              scaleY: 0.2,
              opacity: 0,
              duration: 0.1,
              ease: 'power2.out'
            });
          }
        }
      });
    }
  }, [delay, duration, x, intensity, type]);

  const getDropletStyle = () => {
    const baseStyle = {
      position: 'absolute' as const,
      borderRadius: '0 0 50% 50%',
      mixBlendMode: 'screen' as const,
      filter: 'blur(0.5px)',
    };

    switch (type) {
      case 'light':
        return {
          ...baseStyle,
          width: '1.5px',
          height: '15px',
          background: 'linear-gradient(to bottom, rgba(173, 216, 230, 0.2), rgba(70, 130, 180, 0.1))',
          boxShadow: '0 0 2px rgba(173, 216, 230, 0.3)',
        };
      case 'medium':
        return {
          ...baseStyle,
          width: '2.5px',
          height: '25px',
          background: 'linear-gradient(to bottom, rgba(173, 216, 230, 0.4), rgba(70, 130, 180, 0.2))',
          boxShadow: '0 0 3px rgba(173, 216, 230, 0.4), 0 0 6px rgba(135, 206, 235, 0.2)',
        };
      case 'heavy':
        return {
          ...baseStyle,
          width: '3.5px',
          height: '35px',
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(173, 216, 230, 0.6), rgba(70, 130, 180, 0.4))',
          boxShadow: '0 0 4px rgba(173, 216, 230, 0.6), 0 0 8px rgba(135, 206, 235, 0.3)',
        };
      case 'splash':
        return {
          ...baseStyle,
          width: '4px',
          height: '45px',
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(173, 216, 230, 0.8), rgba(70, 130, 180, 0.6))',
          boxShadow: '0 0 6px rgba(255, 255, 255, 0.4), 0 0 12px rgba(173, 216, 230, 0.5), 0 0 18px rgba(135, 206, 235, 0.3)',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <motion.div
      ref={dropRef}
      style={getDropletStyle()}
      initial={{ opacity: 0 }}
      animate={controls}
    />
  );
};

interface AdvancedRainSystemProps {
  intensity: number;
  windStrength: number;
}

export const AdvancedRainSystem: React.FC<AdvancedRainSystemProps> = ({ 
  intensity = 1, 
  windStrength = 0.5 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const raindrops = useMemo(() => {
    const drops: RaindropProps[] = [];
    const baseCount = Math.floor(intensity * 50);

    // Light raindrops
    for (let i = 0; i < baseCount * 1.5; i++) {
      drops.push({
        id: i,
        type: 'light',
        delay: Math.random() * 8,
        duration: 2 + Math.random() * 3,
        x: Math.random() * 100,
        intensity: 0.2 + Math.random() * 0.3,
      });
    }

    // Medium raindrops
    for (let i = 0; i < baseCount; i++) {
      drops.push({
        id: i + baseCount * 1.5,
        type: 'medium',
        delay: Math.random() * 6,
        duration: 1.5 + Math.random() * 2,
        x: Math.random() * 100,
        intensity: 0.4 + Math.random() * 0.3,
      });
    }

    // Heavy raindrops
    for (let i = 0; i < baseCount * 0.7; i++) {
      drops.push({
        id: i + baseCount * 2.5,
        type: 'heavy',
        delay: Math.random() * 4,
        duration: 1 + Math.random() * 1.5,
        x: Math.random() * 100,
        intensity: 0.6 + Math.random() * 0.3,
      });
    }

    // Splash raindrops
    for (let i = 0; i < baseCount * 0.4; i++) {
      drops.push({
        id: i + baseCount * 3.2,
        type: 'splash',
        delay: Math.random() * 5,
        duration: 0.8 + Math.random() * 1.2,
        x: Math.random() * 100,
        intensity: 0.8 + Math.random() * 0.2,
      });
    }

    return drops;
  }, [intensity]);

  useEffect(() => {
    if (containerRef.current) {
      // Wind effect animation
      gsap.to(containerRef.current, {
        x: windStrength * 20,
        duration: 3 + Math.random() * 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }
  }, [windStrength]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {raindrops.map((drop) => (
        <AdvancedRaindrop key={drop.id} {...drop} />
      ))}
    </div>
  );
};