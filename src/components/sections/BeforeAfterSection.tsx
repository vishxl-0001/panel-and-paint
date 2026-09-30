'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export function BeforeAfterSection() {
  const { beforeAfter } = useContent();

  return (
    <section id="before-after" className="py-20 sm:py-28 bg-brand-card/40 border-y border-brand-border/60 relative overflow-hidden">
      {/* Background Sheen */}
      <div className="absolute -bottom-20 right-0 w-96 h-96 rounded-full bg-orange-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 inline-flex items-center gap-1.5 mb-3">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Interactive Comparison</span>
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
            See the Quality with Your Own Eyes
          </h2>
          <p className="mt-4 text-sm sm:text-base text-brand-muted leading-relaxed">
            Drag the slider across to see prep work and damage transition into mirror-gloss clearcoats and seamless structural alignments.
          </p>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {beforeAfter.map((item) => (
            <BeforeAfterSlider key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
