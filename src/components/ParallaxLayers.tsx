import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ParallaxLayers: React.FC = () => {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create parallax effect based on mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;

      // Different layers move at different speeds
      gsap.to(layer1Ref.current, {
        x: moveX * 20,
        y: moveY * 20,
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(layer2Ref.current, {
        x: moveX * 40,
        y: moveY * 40,
        duration: 0.7,
        ease: "power2.out"
      });

      gsap.to(layer3Ref.current, {
        x: moveX * 60,
        y: moveY * 60,
        duration: 0.9,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Background parallax layer */}
      <div
        ref={layer1Ref}
        className="parallax-layer-1"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '110%',
          height: '110%',
          background: 'radial-gradient(ellipse at 30% 70%, rgba(70, 130, 180, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Middle parallax layer */}
      <div
        ref={layer2Ref}
        className="parallax-layer-2"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '105%',
          height: '105%',
          background: 'radial-gradient(ellipse at 70% 30%, rgba(173, 216, 230, 0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Foreground parallax layer */}
      <div
        ref={layer3Ref}
        className="parallax-layer-3"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '102%',
          height: '102%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(135, 206, 235, 0.02) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />
    </>
  );
};