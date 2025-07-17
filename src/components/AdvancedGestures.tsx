import React, { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag, useWheel } from '@use-gesture/react';

interface AdvancedGesturesProps {
  children: React.ReactNode;
}

export const AdvancedGestures: React.FC<AdvancedGesturesProps> = ({ children }) => {
  const [{ x, y, rotateX, rotateY, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 1, tension: 350, friction: 40 }
  }));

  // Drag gesture for parallax effect
  const bind = useDrag(({ active, movement: [mx, my] }) => {
    api.start({
      x: active ? mx * 0.1 : 0,
      y: active ? my * 0.1 : 0,
      rotateX: active ? my * 0.05 : 0,
      rotateY: active ? mx * 0.05 : 0,
      scale: active ? 1.02 : 1
    });
  });

  // Wheel gesture for zoom effect
  const wheelBind = useWheel(({ active, movement: [, my] }) => {
    api.start({
      scale: active ? Math.max(0.8, Math.min(1.2, 1 + my * 0.001)) : 1
    });
  });

  return (
    <animated.div
      {...bind()}
      {...wheelBind()}
      style={{
        transform: x.to(x => `translateX(${x}px)`),
        transformOrigin: 'center center'
      }}
      className="gesture-container"
    >
      <animated.div
        style={{
          transform: y.to(y => `translateY(${y}px)`),
          transformOrigin: 'center center'
        }}
      >
        <animated.div
          style={{
            transform: rotateX.to(rx => `rotateX(${rx}deg)`),
            transformOrigin: 'center center'
          }}
        >
          <animated.div
            style={{
              transform: rotateY.to(ry => `rotateY(${ry}deg)`),
              transformOrigin: 'center center'
            }}
          >
            <animated.div
              style={{
                transform: scale.to(s => `scale(${s})`),
                transformOrigin: 'center center'
              }}
            >
              {children}
            </animated.div>
          </animated.div>
        </animated.div>
      </animated.div>
    </animated.div>
  );
};