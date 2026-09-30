'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface FallbackShowcaseProps {
  color: string;
}

export function FallbackShowcase({ color }: FallbackShowcaseProps) {
  return (
    <div className="relative w-full h-[320px] sm:h-[420px] flex items-center justify-center overflow-hidden rounded-3xl border border-brand-border/60 bg-gradient-to-b from-brand-card to-brand-dark shadow-2xl">
      {/* Background Glow tinted with selected paint */}
      <div
        className="absolute inset-0 opacity-25 blur-3xl transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: color }}
      />

      {/* Real Workshop Photo Showcase */}
      <div className="relative w-[90%] max-w-[500px] h-[260px] sm:h-[340px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
        <Image
          src="/images/ute-paint-booth.png"
          alt="Ngongotaha Panel & Paint - Custom Spray Booth Finish"
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Dynamic color tint overlay reflecting paint switcher */}
        <div
          className="absolute inset-0 mix-blend-color opacity-35 transition-colors duration-500 pointer-events-none"
          style={{ backgroundColor: color }}
        />

        {/* High-gloss glass sheen effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-white/15 pointer-events-none" />

        {/* Real workshop badge */}
        <div className="absolute top-3 left-3 bg-brand-dark/85 backdrop-blur-md px-3 py-1 rounded-full border border-brand-accent/40 flex items-center gap-1.5 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
          <span className="text-[11px] font-semibold tracking-wide text-white uppercase">Real Workshop Spray Booth</span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 bg-brand-dark/90 backdrop-blur-md p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
          <div className="text-left">
            <p className="text-xs font-bold text-white">Full Ute Clearcoat Respray</p>
            <p className="text-[11px] text-brand-muted">Ngongotahā Workshop</p>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>NZ High-Gloss Standard</span>
          </div>
        </div>
      </div>
    </div>
  );
}
