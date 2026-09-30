'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/types';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function LightboxModal({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const currentItem = items[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
    },
    [currentIndex, items.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown]);

  if (!currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-mono px-2 py-1 rounded bg-brand-card border border-brand-border text-brand-silver">
            {currentItem.category}
          </span>
          <span className="text-xs text-brand-muted">
            {currentIndex + 1} / {items.length}
          </span>
          {currentItem.isRealWork && (
            <span className="flex items-center gap-1 text-[11px] text-brand-accent bg-brand-accent/10 border border-brand-accent/30 px-2 py-0.5 rounded-full font-medium">
              <Sparkles className="w-3 h-3" /> Real Workshop
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="Close image lightbox"
          className="p-2 rounded-full bg-brand-card hover:bg-brand-cardHover border border-brand-border text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative flex-1 w-full max-h-[75vh] flex items-center justify-center my-auto">
        {/* Previous Button */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
          aria-label="Previous image"
          className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-brand-dark/80 hover:bg-brand-card border border-white/10 text-white transition-colors shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Current Image */}
        <div className="relative w-full h-full max-w-4xl max-h-[70vh]">
          <Image
            src={currentItem.imageUrl}
            alt={currentItem.title}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Next Button */}
        <button
          onClick={() => onNavigate((currentIndex + 1) % items.length)}
          aria-label="Next image"
          className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-brand-dark/80 hover:bg-brand-card border border-white/10 text-white transition-colors shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Caption & Details Footer */}
      <div className="max-w-2xl mx-auto text-center z-10 bg-brand-card/70 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-brand-border/60">
        <h3 className="text-sm sm:text-base font-bold text-white">{currentItem.title}</h3>
        {currentItem.caption && (
          <p className="text-xs text-brand-muted mt-1 max-w-xl mx-auto">{currentItem.caption}</p>
        )}
      </div>
    </div>
  );
}
