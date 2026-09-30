'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CarModelProps {
  color: string;
}

export function CarModel({ color }: CarModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle floating and idle breathing
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.02 - 0.2;
    }
  });

  return (
    <group ref={groupRef} dispose={null} scale={[1.15, 1.15, 1.15]}>
      {/* --- MAIN CAR BODY (AERODYNAMIC LOWER CHASSIS) --- */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.45, 4.4]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.88}
          roughness={0.16}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          reflectivity={0.9}
        />
      </mesh>

      {/* FRONT HOOD SLOPE */}
      <mesh position={[0, 0.52, 1.4]} rotation={[-0.14, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.86, 0.28, 1.6]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.88}
          roughness={0.16}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* FRONT NOSE CONE & LOWER BUMPER */}
      <mesh position={[0, 0.32, 2.22]} castShadow receiveShadow>
        <boxGeometry args={[1.82, 0.32, 0.3]} />
        <meshStandardMaterial color="#0A0C10" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* FRONT GRILLE */}
      <mesh position={[0, 0.34, 2.38]}>
        <boxGeometry args={[1.2, 0.16, 0.02]} />
        <meshStandardMaterial color="#111827" wireframe roughness={0.9} />
      </mesh>

      {/* CABIN & GREENHOUSE (SLOPED ROOF) */}
      <mesh position={[0, 0.92, -0.2]} castShadow>
        <boxGeometry args={[1.5, 0.55, 2.1]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.85}
          roughness={0.16}
          clearcoat={1.0}
        />
      </mesh>

      {/* WINDSHIELD (FRONT) */}
      <mesh position={[0, 0.94, 0.82]} rotation={[-0.45, 0, 0]}>
        <boxGeometry args={[1.44, 0.55, 0.05]} />
        <meshPhysicalMaterial
          color="#0F172A"
          roughness={0.05}
          metalness={0.9}
          transmission={0.6}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* REAR REAR-WINDOW */}
      <mesh position={[0, 0.94, -1.22]} rotation={[0.42, 0, 0]}>
        <boxGeometry args={[1.42, 0.52, 0.05]} />
        <meshPhysicalMaterial
          color="#0F172A"
          roughness={0.05}
          metalness={0.9}
          transmission={0.6}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* SIDE WINDOWS */}
      <mesh position={[0.76, 0.92, -0.2]}>
        <boxGeometry args={[0.02, 0.42, 1.8]} />
        <meshStandardMaterial color="#0F172A" roughness={0.1} metalness={0.9} opacity={0.9} transparent />
      </mesh>
      <mesh position={[-0.76, 0.92, -0.2]}>
        <boxGeometry args={[0.02, 0.42, 1.8]} />
        <meshStandardMaterial color="#0F172A" roughness={0.1} metalness={0.9} opacity={0.9} transparent />
      </mesh>

      {/* REAR TRUNK / FASTBACK SPOILER */}
      <mesh position={[0, 0.68, -2.05]} castShadow>
        <boxGeometry args={[1.84, 0.08, 0.45]} />
        <meshPhysicalMaterial color={color} metalness={0.88} roughness={0.16} clearcoat={1.0} />
      </mesh>

      {/* LED HEADLIGHTS (CRYSTAL EMISSIVE) */}
      <mesh position={[0.66, 0.48, 2.18]} rotation={[0.1, 0.2, 0]}>
        <boxGeometry args={[0.36, 0.1, 0.1]} />
        <meshStandardMaterial color="#E0F2FE" emissive="#38BDF8" emissiveIntensity={2.5} />
      </mesh>
      <mesh position={[-0.66, 0.48, 2.18]} rotation={[0.1, -0.2, 0]}>
        <boxGeometry args={[0.36, 0.1, 0.1]} />
        <meshStandardMaterial color="#E0F2FE" emissive="#38BDF8" emissiveIntensity={2.5} />
      </mesh>

      {/* TAIL LIGHTS (NEON RED BAR) */}
      <mesh position={[0, 0.52, -2.22]}>
        <boxGeometry args={[1.72, 0.08, 0.04]} />
        <meshStandardMaterial color="#FF1E1E" emissive="#EF4444" emissiveIntensity={3.2} />
      </mesh>

      {/* SIDE SKIRTS & CARBON ACCENTS */}
      <mesh position={[0.96, 0.26, 0]}>
        <boxGeometry args={[0.08, 0.12, 3.8]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-0.96, 0.26, 0]}>
        <boxGeometry args={[0.08, 0.12, 3.8]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* SIDE MIRRORS */}
      <mesh position={[0.9, 0.82, 0.52]}>
        <boxGeometry args={[0.22, 0.12, 0.18]} />
        <meshStandardMaterial color="#0A0C10" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.9, 0.82, 0.52]}>
        <boxGeometry args={[0.22, 0.12, 0.18]} />
        <meshStandardMaterial color="#0A0C10" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* --- WHEELS & BRAKE CALIPERS --- */}
      {/* Front Right */}
      <Wheel position={[0.96, 0.28, 1.25]} />
      {/* Front Left */}
      <Wheel position={[-0.96, 0.28, 1.25]} isLeft />
      {/* Rear Right */}
      <Wheel position={[0.96, 0.28, -1.25]} />
      {/* Rear Left */}
      <Wheel position={[-0.96, 0.28, -1.25]} isLeft />

      {/* DUAL CHROME EXHAUSTS */}
      <mesh position={[0.42, 0.24, -2.23]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.12, 16]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[-0.42, 0.24, -2.23]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.12, 16]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  );
}

function Wheel({ position, isLeft }: { position: [number, number, number]; isLeft?: boolean }) {
  return (
    <group position={position}>
      {/* Rubber Tire */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.24, 24]} />
        <meshStandardMaterial color="#171717" roughness={0.85} metalness={0.2} />
      </mesh>
      {/* Alloy Rim */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.23, 0.23, 0.25, 16]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Center Cap with Red Accent */}
      <mesh position={[isLeft ? -0.13 : 0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 12]} />
        <meshStandardMaterial color="#EF4444" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}
