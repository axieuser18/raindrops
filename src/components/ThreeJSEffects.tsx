import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Particle system for 3D rain effects
const ParticleRain: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  const particlesCount = 2000;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * viewport.width * 2;
      positions[i * 3 + 1] = Math.random() * viewport.height * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, [viewport]);
  
  const velocities = useMemo(() => {
    const velocities = new Float32Array(particlesCount);
    for (let i = 0; i < particlesCount; i++) {
      velocities[i] = Math.random() * 0.02 + 0.01;
    }
    return velocities;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3 + 1] -= velocities[i];
      
      if (positions[i * 3 + 1] < -viewport.height) {
        positions[i * 3 + 1] = viewport.height;
        positions[i * 3] = (Math.random() - 0.5) * viewport.width * 2;
      }
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <Points ref={meshRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#add8e6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// 3D Lightning effect
const Lightning: React.FC = () => {
  const lightningRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!lightningRef.current) return;
    
    // Random lightning flashes
    if (Math.random() < 0.002) {
      lightningRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.opacity = Math.random() * 0.8 + 0.2;
        }
      });
      
      setTimeout(() => {
        if (lightningRef.current) {
          lightningRef.current.children.forEach((child) => {
            if (child instanceof THREE.Mesh) {
              child.material.opacity = 0;
            }
          });
        }
      }, 100 + Math.random() * 200);
    }
  });

  return (
    <group ref={lightningRef}>
      <mesh position={[0, 5, -10]}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// Atmospheric fog effect
const AtmosphericFog: React.FC = () => {
  const fogRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!fogRef.current) return;
    
    fogRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    fogRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2;
  });

  return (
    <mesh ref={fogRef} position={[0, 0, -15]}>
      <sphereGeometry args={[15, 32, 32]} />
      <meshBasicMaterial 
        color="#1a1a2e" 
        transparent 
        opacity={0.1}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

export const ThreeJSCanvas: React.FC = () => {
  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none',
      zIndex: 1
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ParticleRain />
        <Lightning />
        <AtmosphericFog />
      </Canvas>
    </div>
  );
};