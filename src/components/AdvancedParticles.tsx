import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export const AdvancedParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const createParticle = (x: number, y: number): Particle => {
      const element = document.createElement('div');
      const size = Math.random() * 4 + 2;
      
      element.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, 
          rgba(173, 216, 230, ${Math.random() * 0.8 + 0.2}) 0%, 
          rgba(135, 206, 235, ${Math.random() * 0.6 + 0.1}) 50%, 
          transparent 100%);
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: screen;
        filter: blur(${Math.random() * 0.5}px);
      `;

      containerRef.current?.appendChild(element);

      return {
        element,
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 0,
        maxLife: Math.random() * 300 + 200,
        size
      };
    };

    const updateParticles = () => {
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life++;
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Add some physics
        particle.vy += 0.02; // gravity
        particle.vx *= 0.999; // air resistance
        particle.vy *= 0.999;

        const opacity = 1 - (particle.life / particle.maxLife);
        const scale = 1 - (particle.life / particle.maxLife) * 0.5;

        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
        particle.element.style.opacity = opacity.toString();
        particle.element.style.transform = `scale(${scale})`;

        if (particle.life >= particle.maxLife) {
          particle.element.remove();
          return false;
        }

        return true;
      });

      // Create new particles randomly
      if (Math.random() < 0.3) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particlesRef.current.push(createParticle(x, y));
      }

      animationRef.current = requestAnimationFrame(updateParticles);
    };

    // Start particle system
    updateParticles();

    // Create particles on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() < 0.1) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      particlesRef.current.forEach(particle => particle.element.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="advanced-particles"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3
      }}
    />
  );
};