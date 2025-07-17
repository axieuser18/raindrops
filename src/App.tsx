import React, { useEffect } from 'react';
import { useAudioMixer } from './hooks/useAudioMixer';
import { SceneManager } from './components/SceneManager';
import './RaindropBackground.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const { isPlaying, isLoaded } = useAudioMixer();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out-cubic',
      once: false,
      mirror: true
    });
  }, []);

  return (
    <div className="app-container">
      {/* Scene Manager handles all scene transitions */}
      <SceneManager />
      
      {/* Audio status indicator (subtle) */}
      {isLoaded && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isPlaying ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 255, 0, 0.5)',
            zIndex: 1000,
            opacity: 0.3
          }}
        />
      )}
    </div>
  );
}

export default App;