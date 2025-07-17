import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface RaindropProps {
  id: number;
  type: 'light' | 'medium' | 'heavy' | 'splash';
  delay: number;
}

const AnimatedRaindrop: React.FC<RaindropProps> = ({ id, type, delay }) => {
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dropRef.current) {
      // GSAP timeline for advanced physics
      const tl = gsap.timeline({ repeat: -1, delay });
      
      tl.set(dropRef.current, {
        y: -50,
        x: Math.random() * window.innerWidth,
        scaleY: 0.6,
        opacity: 0,
        rotation: Math.random() * 10 - 5
      })
      .to(dropRef.current, {
        y: window.innerHeight + 50,
        scaleY: 1.5,
        opacity: 1,
        rotation: Math.random() * 15 - 7.5,
        x: `+=${Math.random() * 30 - 15}`,
        duration: 2 + Math.random() * 3,
        ease: "power2.in"
      })
      .to(dropRef.current, {
        opacity: 0,
        duration: 0.2
      }, "-=0.3");
    }
  }, [delay]);

  return (
    <motion.div
      ref={dropRef}
      className={`raindrop ${type}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      style={{
        position: 'absolute',
        width: type === 'light' ? '2px' : type === 'medium' ? '3px' : type === 'heavy' ? '4px' : '5px',
        height: type === 'light' ? '15px' : type === 'medium' ? '25px' : type === 'heavy' ? '35px' : '45px',
      }}
    />
  );
};

export const AnimatedRain: React.FC = () => {
  const raindrops = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    type: ['light', 'medium', 'heavy', 'splash'][Math.floor(Math.random() * 4)] as any,
    delay: Math.random() * 5
  }));

  return (
    <div className="animated-rain-system">
      {raindrops.map((drop) => (
        <AnimatedRaindrop
          key={drop.id}
          id={drop.id}
          type={drop.type}
          delay={drop.delay}
        />
      ))}
    </div>
  );
};