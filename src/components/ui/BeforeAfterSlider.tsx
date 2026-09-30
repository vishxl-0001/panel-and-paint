'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { BeforeAfterItem } from '@/types';
import { ChevronsLeftRight, Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  item: BeforeAfterItem;
}

export function BeforeAfterSlider({ item }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleStart = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  return (
    <div className="bg-brand-card/90 border border-brand-border rounded-2xl overflow-hidden shadow-glass">
      <div className="p-4 sm:p-5 border-b border-brand-border/60 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>{item.title}</span>
            <span className="text-xs font-normal text-brand-muted px-2 py-0.5 rounded-full bg-brand-border/50">
              {item.vehicle}
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted mt-0.5">{item.description}</p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-brand-accent">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real Workshop Finish</span>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        className="relative w-full h-[260px] sm:h-[380px] select-none cursor-ew-resize overflow-hidden bg-brand-dark"
      >
        {/* 'AFTER' Image (Full Background) */}
        <div className="absolute inset-0">
          <Image
            src={item.afterImageUrl}
            alt={`${item.title} - After`}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-emerald-950/80 backdrop-blur-md text-emerald-400 border border-emerald-600/50 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
            {item.afterLabel || 'After: Clearcoat Finish'}
          </div>
        </div>

        {/* 'BEFORE' Image (Clipped with width %) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full min-w-[360px] sm:min-w-[600px] lg:min-w-[900px]">
            <Image
              src={item.beforeImageUrl}
              alt={`${item.title} - Before`}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-4 left-4 bg-red-950/80 backdrop-blur-md text-red-400 border border-red-600/50 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
            {item.beforeLabel || 'Before: Prep / Damage'}
          </div>
        </div>

        {/* Center Draggable Divider Line & Knob */}
        <div
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          className="absolute top-0 bottom-0 z-20 flex flex-col items-center justify-center -translate-x-1/2"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical Glowing Line */}
          <div className="w-[3px] h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />

          {/* Draggable Circle Knob */}
          <div className="absolute w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-dark/95 border-2 border-white shadow-glow-red flex items-center justify-center cursor-grab active:cursor-grabbing text-white transition-transform hover:scale-110">
            <ChevronsLeftRight className="w-5 h-5 text-brand-accent" />
          </div>
        </div>

        {/* Touch Hint */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-medium tracking-wider uppercase bg-brand-dark/60 backdrop-blur-sm text-brand-muted px-2.5 py-0.5 rounded-full border border-white/5 pointer-events-none">
          Drag slider left or right
        </div>
      </div>
    </div>
  );
}
