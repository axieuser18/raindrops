import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RainScene } from './scenes/RainScene';
import { ThunderstormScene } from './scenes/ThunderstormScene';
import { DawnScene } from './scenes/DawnScene';
import { NightCityScene } from './scenes/NightCityScene';
import { FoggyScene } from './scenes/FoggyScene';

const scenes = [
  { component: RainScene, duration: 25000, name: 'Rain' },
  { component: ThunderstormScene, duration: 20000, name: 'Thunderstorm' },
  { component: NightCityScene, duration: 30000, name: 'Night City' },
  { component: FoggyScene, duration: 22000, name: 'Foggy' },
  { component: DawnScene, duration: 28000, name: 'Dawn' }
];

export const SceneManager: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
        setIsTransitioning(false);
      }, 2000); // 2 second transition
      
    }, scenes[currentSceneIndex].duration);

    return () => clearInterval(timer);
  }, [currentSceneIndex]);

  const CurrentScene = scenes[currentSceneIndex].component;

  return (
    <div className="scene-manager">
      {/* Scene transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 bg-black"
          />
        )}
      </AnimatePresence>

      {/* Current scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSceneIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="scene-container"
        >
          <CurrentScene />
        </motion.div>
      </AnimatePresence>

      {/* Scene indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-8 left-8 z-40"
      >
        <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
          <p className="text-white/70 text-sm font-medium">
            {scenes[currentSceneIndex].name}
          </p>
          <div className="flex space-x-1 mt-2">
            {scenes.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index === currentSceneIndex 
                    ? 'bg-white' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};