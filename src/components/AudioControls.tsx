import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface AudioControlsProps {
  isPlaying: boolean;
  volume: number;
  onTogglePlay: () => void;
  onVolumeChange: (volume: number) => void;
  isLoaded: boolean;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  volume,
  onTogglePlay,
  onVolumeChange,
  isLoaded
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-8 right-8 bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10"
      style={{ zIndex: 100 }}
    >
      <div className="flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onTogglePlay}
          disabled={!isLoaded}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </motion.button>

        <div className="flex items-center space-x-2">
          {volume > 0 ? (
            <Volume2 className="w-5 h-5 text-white/80" />
          ) : (
            <VolumeX className="w-5 h-5 text-white/80" />
          )}
          
          <div className="relative w-20">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        <div className="text-xs text-white/60">
          {isLoaded ? (isPlaying ? 'Playing' : 'Paused') : 'Loading...'}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </motion.div>
  );
};