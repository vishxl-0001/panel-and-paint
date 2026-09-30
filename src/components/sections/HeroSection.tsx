'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import { getTelUrl } from '@/lib/utils';
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Star,
  Zap,
  Sparkles,
  Award,
  CheckCircle2,
} from 'lucide-react';

export function HeroSection() {
  const { settings } = useContent();

  return (
    <section className="relative min-h-[90dvh] lg:min-h-[92dvh] w-full flex flex-col justify-between overflow-hidden bg-brand-dark pt-6 sm:pt-10 pb-16">
      {/* Background Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full bg-brand-accent/15 blur-[120px] pointer-events-none" />
      <div className="absolute -top-10 left-10 w-72 h-72 rounded-full bg-orange-600/10 blur-[100px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Trust Signals & CTAs */}
          <div className="lg:col-span-6 z-10 text-center lg:text-left space-y-5 sm:space-y-6">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-card/90 border border-brand-border/80 shadow-sm">
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

          {/* Right Column: Premium Workshop Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-brand-border/80 bg-gradient-to-b from-brand-card to-brand-dark shadow-2xl group">
              {/* Real Workshop Photo */}
              <div className="relative w-full h-[280px] sm:h-[380px] overflow-hidden bg-brand-dark">
                <Image
                  src="/images/ute-paint-booth.png"
                  alt="Ngongotaha Panel & Paint - Custom Spray Booth Finish"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-transparent to-black/20" />
                
                {/* Real Workshop Badge */}
                <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-accent/40 flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                    Real Workshop Spray Booth
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-brand-dark/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1 shadow-lg">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-white">4.4 Google</span>
                </div>

                {/* Overlay Highlights */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-accent font-semibold">
                    Ngongotahā Workshop • 142 Oturoa Road
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white drop-shadow-md">
                    Full Body Clearcoat & Paint Finishes
                  </h3>
                </div>
              </div>

              {/* Bottom Feature Bar */}
              <div className="p-4 sm:p-5 bg-brand-card/95 border-t border-brand-border/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-brand-silver">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Oven-Baked Mirror Gloss</span>
                </div>
                <div className="flex items-center gap-2 text-brand-silver">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>UV Sun Protection</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-brand-silver">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WoF Rust Certified</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
