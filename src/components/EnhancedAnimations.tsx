import React, { useEffect, useRef } from 'react';
import { useSpring, animated, useTrail, useChain, useSpringRef } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EnhancedAnimationsProps {
  children: React.ReactNode;
}

export const EnhancedAnimations: React.FC<EnhancedAnimationsProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Advanced spring animation for container
  const containerSpring = useSpring({
    opacity: inView ? 1 : 0.9,
    transform: inView ? 'scale(1) rotateX(0deg)' : 'scale(0.99) rotateX(1deg)',
    filter: inView ? 'blur(0px) brightness(1)' : 'blur(0.5px) brightness(0.95)',
    config: { tension: 200, friction: 50, mass: 1.2 }
  });

  // GSAP timeline for complex animations
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });
    
    // Enhanced breathing effect with rotation
    tl.to(containerRef.current, {
      scale: 1.015,
      rotationZ: 0.2,
      duration: 12,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    })
    .to(containerRef.current, {
      scale: 0.995,
      rotationZ: -0.1,
      duration: 10,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    })
    .to(containerRef.current, {
      scale: 1.008,
      rotationZ: 0.15,
      duration: 14,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <animated.div
      ref={(node) => {
        containerRef.current = node;
        ref(node);
      }}
      style={containerSpring}
      className="enhanced-animations-container"
    >
      {children}
    </animated.div>
  );
};

// Floating particles component
export const FloatingParticles: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!particlesRef.current) return;

    // Mouse magnetic effect
    const handleMouseMove = (e: MouseEvent) => {
      magneticRef.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    const particles = Array.from({ length: 35 }, (_, i) => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      const size = Math.random() * 6 + 2;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, 
          rgba(173, 216, 230, ${Math.random() * 0.4 + 0.2}) 0%, 
          rgba(135, 206, 235, ${Math.random() * 0.3 + 0.1}) 50%, 
          transparent 100%);
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: screen;
        filter: blur(${Math.random() * 0.5}px);
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      particlesRef.current?.appendChild(particle);

      // Enhanced particle animation with magnetic attraction
      const animateParticle = () => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;
        
        const distanceX = magneticRef.current.x - particleX;
        const distanceY = magneticRef.current.y - particleY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        const magneticForce = Math.min(100 / (distance + 1), 20);
        const magneticX = (distanceX / distance) * magneticForce;
        const magneticY = (distanceY / distance) * magneticForce;
        
        gsap.to(particle, {
          x: `+=${Math.random() * 150 - 75 + (magneticX || 0)}`,
          y: `+=${Math.random() * 150 - 75 + (magneticY || 0)}`,
          rotation: `+=${Math.random() * 360}`,
          scale: Math.random() * 0.5 + 0.8,
          opacity: Math.random() * 0.6 + 0.3,
          duration: Math.random() * 8 + 4,
          ease: "power2.inOut",
          onComplete: animateParticle
        });
      };
      
      // Start animation with delay
      setTimeout(animateParticle, Math.random() * 2000);
      
      // Pulsing effect
      gsap.to(particle, {
        scale: Math.random() * 0.3 + 0.9,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 2
      });

      return particle;
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return <div ref={particlesRef} className="floating-particles-container" />;
};

// Advanced ripple effects
export const AdvancedRipples: React.FC = () => {
  const ripplesRef = useRef<HTMLDivElement>(null);
  const rippleCountRef = useRef(0);

  useEffect(() => {
    if (!ripplesRef.current) return;

    // Enhanced ripple creation with variety
    const createRipple = () => {
      const ripple = document.createElement('div');
      ripple.className = `advanced-ripple ripple-${rippleCountRef.current % 3}`;
      const size = Math.random() * 80 + 40;
      const opacity = Math.random() * 0.4 + 0.2;
      
      ripple.style.cssText = `
        position: absolute;
        border: ${Math.random() * 2 + 1}px solid rgba(173, 216, 230, ${opacity});
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: screen;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 80 + 10}%;
        width: 0;
        height: 0;
        box-shadow: 0 0 ${size/4}px rgba(173, 216, 230, ${opacity * 0.5});
      `;
      ripplesRef.current?.appendChild(ripple);

      // Multiple ripple waves
      const createWave = (delay: number, scale: number) => {
        gsap.to(ripple, {
          width: size * scale,
          height: size * scale,
          opacity: 0,
          borderWidth: 0,
          duration: Math.random() * 4 + 3,
          delay,
          ease: "power2.out"
        });
      };
      
      createWave(0, 1);
      createWave(0.5, 1.5);
      createWave(1, 2);
      
      gsap.to(ripple, {
        delay: 6,
        onComplete: () => {
          ripple.remove();
        }
      });
      
      rippleCountRef.current++;
    };

    // Create ripples more frequently with variation
    const interval = setInterval(() => {
      createRipple();
      // Sometimes create multiple ripples
      if (Math.random() < 0.3) {
        setTimeout(createRipple, Math.random() * 500);
      }
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  return <div ref={ripplesRef} className="advanced-ripples-container" />;
};

// Trail animation for multiple elements
export const TrailAnimation: React.FC<{ items: React.ReactNode[]; reverse?: boolean }> = ({ 
  items, 
  reverse = false 
}) => {
  const springRef = useSpringRef();
  const trail = useTrail(items.length, {
    ref: springRef,
    opacity: 1,
    transform: 'translateY(0px) scale(1) rotateX(0deg)',
    from: { 
      opacity: 0, 
      transform: reverse 
        ? 'translateY(-30px) scale(0.8) rotateX(10deg)' 
        : 'translateY(30px) scale(0.8) rotateX(-10deg)' 
    },
    config: { tension: 200, friction: 25, mass: 1 }
  });
  
  useChain([springRef], [0.1]);

  return (
    <div className="trail-container">
      {trail.map((style, index) => (
        <animated.div 
          key={index} 
          style={{
            ...style,
            willChange: 'transform, opacity'
          }}
        >
          {items[index]}
        </animated.div>
      ))}
    </div>
  );
};