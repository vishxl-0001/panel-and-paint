'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';

export interface PaintColorOption {
  id: string;
  name: string;
  hex: string;
  finish: string;
}

export const PAINT_COLORS: PaintColorOption[] = [
  { id: 'phantom-black', name: 'Phantom Obsidian', hex: '#111318', finish: 'Mirror Clearcoat' },
  { id: 'electric-ruby', name: 'Electric Vermillion', hex: '#DC2626', finish: 'High-Solid Gloss' },
  { id: 'candy-orange', name: 'Candy Sunset Orange', hex: '#EA580C', finish: 'Metallic Flake' },
  { id: 'liquid-silver', name: 'Liquid Titanium Silver', hex: '#94A3B8', finish: 'Oven-Baked Clear' },
  { id: 'azure-blue', name: 'Deep Pacific Azure', hex: '#2563EB', finish: 'Pearl Clearcoat' },
  { id: 'racing-emerald', name: 'Rotorua Pine Emerald', hex: '#059669', finish: 'Deep Lacquer' },
  { id: 'pearl-gold', name: 'Daytona Gold Pearl', hex: '#D97706', finish: '3-Stage Mica' },
];

interface PaintSwitcherProps {
  selectedColor: string;
  onSelectColor: (hex: string) => void;
}

export function PaintSwitcher({ selectedColor, onSelectColor }: PaintSwitcherProps) {
  const activeColor = PAINT_COLORS.find((c) => c.hex.toLowerCase() === selectedColor.toLowerCase()) || PAINT_COLORS[0];

  return (
    <div className="bg-brand-card/90 backdrop-blur-md border border-brand-border/80 rounded-2xl p-3 sm:p-4 shadow-glass max-w-sm sm:max-w-md w-full">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-brand-muted font-medium">
          <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
          <span>Interactive Paint Finishes</span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-brand-border/60 text-brand-silver">
          {activeColor.finish}
        </span>
      </div>

      <div className="flex items-center justify-between gap-1.5 sm:gap-2">
        {PAINT_COLORS.map((paint) => {
          const isSelected = selectedColor.toLowerCase() === paint.hex.toLowerCase();
          return (
            <button
              key={paint.id}
              onClick={() => onSelectColor(paint.hex)}
              type="button"
              title={`${paint.name} (${paint.finish})`}
              aria-label={`Select paint ${paint.name}`}
              className="relative group min-w-[36px] min-h-[44px] flex flex-col items-center justify-center focus:outline-none"
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-300 shadow-md flex items-center justify-center border ${
                  isSelected
                    ? 'ring-2 ring-brand-accent ring-offset-2 ring-offset-brand-dark scale-110 border-white/60'
                    : 'border-white/20 hover:scale-105'
                }`}
                style={{ backgroundColor: paint.hex }}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-2 text-center text-xs text-brand-silver font-medium">
        Active Paint:{' '}
        <span className="text-white font-semibold">{activeColor.name}</span>
      </div>
    </div>
  );
}
