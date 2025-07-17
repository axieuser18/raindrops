import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const FluidAnimations: React.FC = () => {
  const fluidRef = useRef<HTMLDivElement>(null);
  const wavesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!fluidRef.current) return;

    // Create multiple wave layers
    const waveCount = 5;
    wavesRef.current = [];

    for (let i = 0; i < waveCount; i++) {
      const wave = document.createElement('div');
      wave.className = `fluid-wave wave-${i}`;
      wave.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 200%;
        height: ${20 + i * 10}px;
        background: linear-gradient(90deg, 
          rgba(173, 216, 230, ${0.1 - i * 0.015}) 0%, 
          rgba(135, 206, 235, ${0.08 - i * 0.012}) 50%, 
          rgba(173, 216, 230, ${0.1 - i * 0.015}) 100%);
        border-radius: 50% 50% 0 0;
        transform-origin: center bottom;
        mix-blend-mode: multiply;
      `;

      fluidRef.current.appendChild(wave);
      wavesRef.current.push(wave);

      // Animate each wave with different parameters
      gsap.to(wave, {
        x: '-50%',
        duration: 8 + i * 2,
        repeat: -1,
        ease: 'none'
      });

      gsap.to(wave, {
        scaleY: 1.2 + Math.sin(i) * 0.3,
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });

      gsap.to(wave, {
        skewX: Math.sin(i) * 2,
        duration: 6 + i * 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }

    // Add floating bubbles
    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.style.cssText = `
        position: absolute;
        width: ${Math.random() * 8 + 4}px;
        height: ${Math.random() * 8 + 4}px;
        background: radial-gradient(circle, 
          rgba(255, 255, 255, 0.3) 0%, 
          rgba(173, 216, 230, 0.2) 50%, 
          transparent 100%);
        border-radius: 50%;
        bottom: 0;
        left: ${Math.random() * 100}%;
        pointer-events: none;
        mix-blend-mode: screen;
      `;

      fluidRef.current?.appendChild(bubble);

      gsap.to(bubble, {
        y: -window.innerHeight - 100,
        x: `+=${Math.random() * 100 - 50}`,
        opacity: 0,
        duration: Math.random() * 8 + 5,
        ease: 'power1.out',
        onComplete: () => bubble.remove()
      });

      gsap.to(bubble, {
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    };

    // Create bubbles periodically
    const bubbleInterval = setInterval(() => {
      if (Math.random() < 0.7) {
        createBubble();
      }
    }, 1000);

    return () => {
      clearInterval(bubbleInterval);
      wavesRef.current.forEach(wave => wave.remove());
    };
  }, []);

  return (
    <div
      ref={fluidRef}
      className="fluid-animations"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '30%',
        pointerEvents: 'none',
        zIndex: 4,
        overflow: 'hidden'
      }}
    />
  );
};