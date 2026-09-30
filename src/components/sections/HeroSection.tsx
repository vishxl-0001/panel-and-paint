'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useContent } from '@/context/ContentContext';
import { PaintSwitcher } from '@/components/3d/PaintSwitcher';
import { FallbackShowcase } from '@/components/3d/FallbackShowcase';
import { isLowEndDevice, getTelUrl } from '@/lib/utils';
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Star,
  Zap,
  Loader2,
} from 'lucide-react';

// Dynamic import of 3D Canvas with SSR disabled to prevent server-side WebGL errors on Vercel
const CarCanvas = dynamic(
  () => import('@/components/3d/CarCanvas').then((mod) => mod.CarCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-accent animate-spin opacity-40" />
      </div>
    ),
  }
);

export function HeroSection() {
  const { settings } = useContent();
  const [paintColor, setPaintColor] = useState<string>('#111318'); // Default Phantom Obsidian
  const [useFallback, setUseFallback] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    if (isLowEndDevice()) {
      setUseFallback(true);
    }
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-brand-dark pt-4 sm:pt-8 pb-12">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full bg-brand-accent/15 blur-[120px] pointer-events-none" />
      <div className="absolute -top-10 left-10 w-72 h-72 rounded-full bg-orange-600/10 blur-[100px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Headline, Trust Signals & CTAs */}
          <div className="lg:col-span-6 z-10 text-center lg:text-left space-y-5 sm:space-y-6">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-card/90 border border-brand-border/80 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-brand-silver">
                Rotorua&apos;s Trusted Panel & Spray Specialists
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-accent/20 text-brand-accent font-bold">
                ★ 4.4 Google
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-[1.1] sm:leading-[1.08]">
              Flawless <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-brand-accent to-orange-500">Panel & Paint</span> in Rotorua
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base lg:text-lg text-brand-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {settings.heroSubheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/#quote"
                className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-accent to-red-600 hover:from-red-600 hover:to-brand-accent text-white font-bold text-sm sm:text-base shadow-glow-red hover:shadow-xl flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={getTelUrl(settings.phone)}
                className="w-full sm:w-auto min-h-[48px] px-5 py-3.5 rounded-xl bg-brand-card hover:bg-brand-cardHover border border-brand-border text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-accent" />
                <span>Call Now: {settings.phone}</span>
              </a>
            </div>

            {/* Quick Micro Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-brand-border/40 text-left">
              <div>
                <p className="text-base sm:text-lg font-bold text-white flex items-center gap-1">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Fast</span>
                </p>
                <p className="text-[11px] text-brand-muted">Often same-day or next-day</p>
              </div>

              <div>
                <p className="text-base sm:text-lg font-bold text-white flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Fair</span>
                </p>
                <p className="text-[11px] text-brand-muted">Honest rates, no surprises</p>
              </div>

              <div>
                <p className="text-base sm:text-lg font-bold text-white flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>4.4 / 5</span>
                </p>
                <p className="text-[11px] text-brand-muted">7 verified Google reviews</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Car Scene or Fallback Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full">
            <div className="w-full h-[320px] xs:h-[360px] sm:h-[450px] lg:h-[480px] relative">
              {mounted && (
                useFallback ? (
                  <FallbackShowcase color={paintColor} />
                ) : (
                  <CarCanvas color={paintColor} />
                )
              )}
            </div>

            {/* Interactive Paint Switcher Bar */}
            <div className="w-full flex justify-center -mt-6 sm:-mt-8 z-20 px-2">
              <PaintSwitcher
                selectedColor={paintColor}
                onSelectColor={(hex) => setPaintColor(hex)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
