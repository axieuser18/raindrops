import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

// Note: MorphSVGPlugin requires GSAP license, using alternative approach
export const MorphingShapes: React.FC = () => {
  const shapeRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shapeRef.current || !containerRef.current) return;

    // Create morphing animation using path data
    const shapes = [
      "M50,10 L90,90 L10,90 Z", // Triangle
      "M10,50 Q50,10 90,50 Q50,90 10,50", // Circle-like
      "M10,10 L90,10 L90,90 L10,90 Z", // Square
      "M50,10 Q90,30 90,50 Q90,70 50,90 Q10,70 10,50 Q10,30 50,10", // Oval
    ];

    let currentIndex = 0;

    const morphAnimation = () => {
      const nextIndex = (currentIndex + 1) % shapes.length;
      
      gsap.to(shapeRef.current, {
        duration: 3,
        ease: "power2.inOut",
        morphSVG: shapes[nextIndex],
        onComplete: () => {
          currentIndex = nextIndex;
          setTimeout(morphAnimation, 2000);
        }
      });
    };

    // Start morphing after delay
    setTimeout(morphAnimation, 1000);

    // Add floating animation to container
    gsap.to(containerRef.current, {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    gsap.to(containerRef.current, {
      x: 15,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

  }, []);

  return (
    <div 
      ref={containerRef}
      className="morphing-shapes"
      style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '100px',
        height: '100px',
        opacity: 0.1,
        pointerEvents: 'none',
        zIndex: 2
      }}
    >
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path
          ref={shapeRef}
          d="M50,10 L90,90 L10,90 Z"
          fill="rgba(173, 216, 230, 0.3)"
          stroke="rgba(173, 216, 230, 0.5)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};