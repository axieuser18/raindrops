import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export const DynamicCityscape: React.FC = () => {
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cityRef.current) {
      // Parallax effect for buildings
      const buildings = cityRef.current.querySelectorAll('.building-enhanced');
      
      buildings.forEach((building, index) => {
        gsap.to(building, {
          y: Math.sin(index) * 5,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      // Dynamic window lights
      const lights = cityRef.current.querySelectorAll('.window-light-enhanced');
      lights.forEach((light, index) => {
        gsap.to(light, {
          opacity: Math.random() * 0.5 + 0.5,
          duration: 2 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 2
        });
      });
    }
  }, []);

  const buildings = [
    { width: '8%', height: '60%', left: '5%' },
    { width: '6%', height: '45%', left: '12%' },
    { width: '10%', height: '75%', left: '17%' },
    { width: '7%', height: '55%', left: '26%' },
    { width: '12%', height: '80%', left: '32%' },
    { width: '8%', height: '65%', left: '43%' },
    { width: '9%', height: '70%', left: '50%' },
    { width: '11%', height: '85%', left: '58%' },
    { width: '7%', height: '50%', left: '68%' },
    { width: '20%', height: '60%', left: '74%' }
  ];

  return (
    <div ref={cityRef} className="dynamic-cityscape" style={{ position: 'absolute', bottom: '25%', width: '100%', height: '50%', zIndex: 2 }}>
      {buildings.map((building, index) => (
        <motion.div
          key={index}
          className="building-enhanced"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: index * 0.1 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: building.left,
            width: building.width,
            height: building.height,
            background: `linear-gradient(180deg, 
              rgba(${20 + index * 5}, ${20 + index * 3}, ${30 + index * 2}, 0.9) 0%,
              rgba(${15 + index * 3}, ${15 + index * 2}, ${25 + index * 2}, 0.95) 50%,
              rgba(${10 + index * 2}, ${10 + index * 2}, ${20 + index * 2}, 1) 100%)`,
            borderTop: '1px solid rgba(40, 40, 60, 0.8)',
            clipPath: index % 3 === 0 ? 'polygon(0 100%, 0 20%, 20% 15%, 80% 15%, 100% 20%, 100% 100%)' :
                     index % 3 === 1 ? 'polygon(0 100%, 0 10%, 50% 0, 100% 10%, 100% 100%)' :
                     'polygon(0 100%, 0 0, 100% 0, 100% 100%)'
          }}
        >
          {/* Enhanced window lights */}
          {Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, lightIndex) => (
            <motion.div
              key={lightIndex}
              className="window-light-enhanced"
              style={{
                position: 'absolute',
                width: '3px',
                height: '4px',
                background: `rgba(255, ${220 + Math.random() * 35}, ${120 + Math.random() * 50}, 0.9)`,
                left: `${20 + (lightIndex % 3) * 25}%`,
                top: `${30 + Math.floor(lightIndex / 3) * 20}%`,
                borderRadius: '1px'
              }}
              animate={{
                boxShadow: [
                  '0 0 8px rgba(255,220,120,0.6)',
                  '0 0 15px rgba(255,220,120,0.9)',
                  '0 0 8px rgba(255,220,120,0.6)'
                ]
              }}
              transition={{ duration: 2 + Math.random(), repeat: Infinity }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};