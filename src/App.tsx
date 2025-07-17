import React from 'react';
import './RaindropBackground.css';

function App() {
  // Generate multiple layers of raindrops with varying properties
  const lightRaindrops = Array.from({ length: 80 }, (_, i) => (
    <div
      key={`light-${i}`}
      className="raindrop light"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 6}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
        opacity: 0.2 + Math.random() * 0.3,
        transform: `rotate(${-5 + Math.random() * 10}deg)`,
      }}
    />
  ));

  const mediumRaindrops = Array.from({ length: 60 }, (_, i) => (
    <div
      key={`medium-${i}`}
      className="raindrop medium"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${1.5 + Math.random() * 2}s`,
        opacity: 0.3 + Math.random() * 0.3,
        transform: `rotate(${-3 + Math.random() * 6}deg)`,
      }}
    />
  ));

  const heavyRaindrops = Array.from({ length: 40 }, (_, i) => (
    <div
      key={`heavy-${i}`}
      className="raindrop heavy"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${1 + Math.random() * 1.5}s`,
        opacity: 0.4 + Math.random() * 0.3,
        transform: `rotate(${-2 + Math.random() * 4}deg)`,
      }}
    />
  ));

  const splashDrops = Array.from({ length: 25 }, (_, i) => (
    <div
      key={`splash-${i}`}
      className="raindrop splash"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${0.8 + Math.random() * 1.2}s`,
        opacity: 0.5 + Math.random() * 0.3,
      }}
    />
  ));

  return (
    <div className="rain-container">
      {/* Dynamic background with lightning effects */}
      <div className="rain-background" />
      <div className="lightning-layer" />
      
      {/* City skyline */}
      <div className="city-skyline">
        <div className="building building-1" />
        <div className="building building-2" />
        <div className="building building-3" />
        <div className="building building-4" />
        <div className="building building-5" />
        <div className="building building-6" />
        <div className="building building-7" />
        <div className="building building-8" />
        <div className="building building-9" />
        <div className="building building-10" />
        
        {/* Building windows with lights */}
        <div className="city-lights">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={`light-${i}`}
              className="window-light"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${30 + Math.random() * 40}%`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Street and car */}
      <div className="street">
        <div className="road" />
        <div className="car moving-car">
          <div className="car-body" />
          <div className="car-roof" />
          <div className="car-windshield" />
          <div className="car-wheel car-wheel-front" />
          <div className="car-wheel car-wheel-rear" />
          <div className="headlight headlight-left" />
          <div className="headlight headlight-right" />
          <div className="taillight taillight-left" />
          <div className="taillight taillight-right" />
        </div>
        
        {/* Street reflections */}
        <div className="street-reflections">
          <div className="reflection car-reflection moving-reflection" />
          <div className="reflection light-reflection-1 moving-light-1" />
          <div className="reflection light-reflection-2 moving-light-2" />
          <div className="reflection light-reflection-3 moving-light-3" />
        </div>
      </div>
      
      {/* Advanced cloud system */}
      <div className="clouds">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="cloud cloud-4" />
        <div className="cloud cloud-5" />
      </div>
      
      {/* Multi-layered rain system */}
      <div className="rain-layer background-rain">
        {lightRaindrops}
      </div>
      
      <div className="rain-layer medium-rain">
        {mediumRaindrops}
      </div>
      
      <div className="rain-layer foreground-rain">
        {heavyRaindrops}
      </div>
      
      <div className="rain-layer splash-rain">
        {splashDrops}
      </div>
      
      {/* Atmospheric effects */}
      <div className="mist-layer" />
      <div className="wind-effect" />
      
      {/* Rain puddle effects */}
      <div className="puddle-effects">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={`ripple-${i}`}
            className="rain-ripple"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;