import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const AdvancedLighting: React.FC = () => {
  const lightingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lightingRef.current) return;

    // Create dynamic lighting effects
    const createLightningFlash = () => {
      const flash = document.createElement('div');
      flash.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(ellipse at ${Math.random() * 100}% ${Math.random() * 50}%, 
          rgba(255, 255, 255, 0.4) 0%, 
          rgba(173, 216, 230, 0.2) 30%, 
          transparent 70%);
        pointer-events: none;
        opacity: 0;
        z-index: 10;
      `;
      lightingRef.current?.appendChild(flash);

      // Lightning sequence
      const tl = gsap.timeline({
        onComplete: () => flash.remove()
      });

      tl.to(flash, { opacity: 0.8, duration: 0.1 })
        .to(flash, { opacity: 0, duration: 0.05 })
        .to(flash, { opacity: 1, duration: 0.1 })
        .to(flash, { opacity: 0, duration: 0.3 });
    };

    // Random lightning flashes
    const lightningInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every interval
        createLightningFlash();
      }
    }, 8000);

    // Ambient light pulsing
    const ambientLight = document.createElement('div');
    ambientLight.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, 
        rgba(70, 130, 180, 0.1) 0%, 
        rgba(25, 25, 112, 0.05) 50%, 
        transparent 100%);
      pointer-events: none;
      z-index: 1;
    `;
    lightingRef.current?.appendChild(ambientLight);

    gsap.to(ambientLight, {
      opacity: 0.8,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    return () => {
      clearInterval(lightningInterval);
      ambientLight.remove();
    };
  }, []);

  return <div ref={lightingRef} className="advanced-lighting" />;
};

// Street lamp effects
export const StreetLamps: React.FC = () => {
  const lampsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lampsRef.current) return;

    // Create street lamps
    const lampPositions = [15, 35, 55, 75, 90];
    
    lampPositions.forEach((position, index) => {
      const lampContainer = document.createElement('div');
      lampContainer.style.cssText = `
        position: absolute;
        bottom: 25%;
        left: ${position}%;
        width: 4px;
        height: 60px;
        z-index: 4;
      `;

      // Lamp post
      const post = document.createElement('div');
      post.style.cssText = `
        width: 100%;
        height: 80%;
        background: linear-gradient(180deg, 
          rgba(60, 60, 70, 0.9) 0%, 
          rgba(40, 40, 50, 1) 100%);
        border-radius: 2px;
      `;

      // Lamp light
      const light = document.createElement('div');
      light.style.cssText = `
        position: absolute;
        top: -8px;
        left: -6px;
        width: 16px;
        height: 16px;
        background: radial-gradient(circle, 
          rgba(255, 220, 120, 0.9) 0%, 
          rgba(255, 200, 80, 0.6) 50%, 
          transparent 100%);
        border-radius: 50%;
        box-shadow: 0 0 20px rgba(255, 220, 120, 0.8),
                    0 0 40px rgba(255, 220, 120, 0.4);
      `;

      // Light cone
      const cone = document.createElement('div');
      cone.style.cssText = `
        position: absolute;
        top: 8px;
        left: -15px;
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: 40px solid rgba(255, 220, 120, 0.1);
        filter: blur(2px);
      `;

      lampContainer.appendChild(post);
      lampContainer.appendChild(light);
      lampContainer.appendChild(cone);
      lampsRef.current?.appendChild(lampContainer);

      // Flickering animation
      gsap.to(light, {
        opacity: 0.7,
        duration: 0.1 + Math.random() * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.5
      });
    });

    return () => {
      if (lampsRef.current) {
        lampsRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={lampsRef} className="street-lamps" />;
};