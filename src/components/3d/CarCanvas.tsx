'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { CarModel } from './CarModel';
import { Loader2 } from 'lucide-react';

interface CarCanvasProps {
  color: string;
}

export function CarCanvas({ color }: CarCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause rendering when scrolled out of viewport
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      {isVisible ? (
        <Canvas
          shadows
          dpr={[1, 1.5]} // Capped at 1.5 for silky smooth mobile performance
          camera={{ position: [3.8, 2.0, 4.6], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            {/* Automotive Studio Key & Rim Lights */}
            <ambientLight intensity={1.2} />
            <directionalLight position={[6, 8, 5]} intensity={2.5} castShadow shadow-mapSize={1024} />
            <directionalLight position={[-6, 5, -5]} intensity={1.8} color="#93C5FD" />
            <pointLight position={[0, 4, 0]} intensity={1.5} color="#FFFFFF" />

            {/* Car Model */}
            <CarModel color={color} />

            {/* Studio Floor Soft Contact Shadow */}
            <ContactShadows
              position={[0, 0.01, 0]}
              opacity={0.7}
              scale={10}
              blur={2.2}
              far={4.5}
              resolution={512}
              color="#000000"
            />

            {/* Smooth OrbitControls with restricted angles */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.8}
              minPolarAngle={Math.PI / 3.8}
              maxPolarAngle={Math.PI / 2.05}
              dampingFactor={0.06}
            />
          </Suspense>
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-brand-accent animate-spin opacity-40" />
        </div>
      )}

      {/* Touch Interaction Hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none text-[11px] text-brand-muted/70 tracking-wider uppercase font-medium bg-brand-dark/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
        Drag to rotate 360°
      </div>
    </div>
  );
}
