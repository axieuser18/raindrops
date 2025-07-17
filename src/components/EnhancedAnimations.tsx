import React, { useEffect, useRef } from 'react';
import { useSpring, animated, useTrail } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';

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
    opacity: inView ? 1 : 0.8,
    transform: inView ? 'scale(1)' : 'scale(0.98)',
    config: { tension: 280, friction: 60 }
  });

  // GSAP timeline for complex animations
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    // Breathing effect
    tl.to(containerRef.current, {
      scale: 1.02,
      duration: 8,
      ease: "power2.inOut"
    })
    .to(containerRef.current, {
      scale: 1,
      duration: 8,
      ease: "power2.inOut"
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

  useEffect(() => {
    if (!particlesRef.current) return;

    const particles = Array.from({ length: 20 }, (_, i) => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(173, 216, 230, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      particlesRef.current?.appendChild(particle);

      // Animate each particle
      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 10 + 5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      return particle;
    });

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return <div ref={particlesRef} className="floating-particles-container" />;
};

// Advanced ripple effects
export const AdvancedRipples: React.FC = () => {
  const ripplesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ripplesRef.current) return;

    const createRipple = () => {
      const ripple = document.createElement('div');
      ripple.className = 'advanced-ripple';
      ripple.style.cssText = `
        position: absolute;
        border: 2px solid rgba(173, 216, 230, 0.6);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: 0;
        height: 0;
      `;
      ripplesRef.current?.appendChild(ripple);

      gsap.to(ripple, {
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        opacity: 0,
        duration: Math.random() * 3 + 2,
        ease: "power2.out",
        onComplete: () => ripple.remove()
      });
    };

    const interval = setInterval(createRipple, 2000);
    return () => clearInterval(interval);
  }, []);

  return <div ref={ripplesRef} className="advanced-ripples-container" />;
};

// Trail animation for multiple elements
export const TrailAnimation: React.FC<{ items: React.ReactNode[] }> = ({ items }) => {
  const trail = useTrail(items.length, {
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 280, friction: 60 }
  });

  return (
    <div className="trail-container">
      {trail.map((style, index) => (
        <animated.div key={index} style={style}>
          {items[index]}
        </animated.div>
      ))}
    </div>
  );
};