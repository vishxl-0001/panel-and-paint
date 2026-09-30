'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import { GalleryItem } from '@/types';
import { LightboxModal } from '@/components/ui/LightboxModal';
import { Sparkles, Maximize2, Camera } from 'lucide-react';

const CATEGORIES = ['All', 'Paint Work', 'Panel & Dents', 'Rust & WoF', 'Bumpers & Detailing'] as const;

export function GallerySection() {
  const { gallery } = useContent();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = gallery.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-brand-card/30 border-y border-brand-border/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 inline-flex items-center gap-1.5 mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Workshop Portfolio</span>
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
            Our Work in the Spray Booth & Workshop
          </h2>
          <p className="mt-4 text-sm sm:text-base text-brand-muted leading-relaxed">
            Real automotive transformations from our Ngongotahā workshop. Filter by job type and tap any photo to view in high definition.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? 'bg-brand-accent text-white shadow-glow-red'
                    : 'bg-brand-card hover:bg-brand-cardHover text-brand-silver border border-brand-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden bg-brand-card border border-brand-border cursor-pointer shadow-glass hover:border-brand-accent/50 transition-all duration-300 hover:-translate-y-1"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Real Workshop Badge */}
              {item.isRealWork && (
                <div className="absolute top-4 left-4 z-10 bg-brand-dark/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-brand-accent/40 flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3 h-3 text-brand-accent" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                    Real Workshop Photo
                  </span>
                </div>
              )}

              {/* Zoom Icon on Hover */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-brand-dark/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Title & Caption in Bottom Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-accent">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5 line-clamp-1">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-brand-muted mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </section>
  );
}
