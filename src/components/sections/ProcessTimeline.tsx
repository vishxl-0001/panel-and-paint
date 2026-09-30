'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, FileSpreadsheet, Wrench, CheckCircle, ArrowRight } from 'lucide-react';

export function ProcessTimeline() {
  const steps = [
    {
      number: '01',
      title: 'Send Damage Photos',
      subtitle: 'Snap with your phone',
      description: 'Upload 2-3 photos of the damage via our fast online form or send them directly to our WhatsApp on +64 27 684 1468.',
      icon: Camera,
      tag: 'Takes 60 seconds',
    },
    {
      number: '02',
      title: 'Get a Transparent Quote',
      subtitle: 'No obligation & no surprises',
      description: 'Darren assesses the photos and provides an honest, fair estimate. We explain whether panels can be saved to keep costs down.',
      icon: FileSpreadsheet,
      tag: 'Prompt Response',
    },
    {
      number: '03',
      title: 'Precision Repair & Bake',
      subtitle: 'Master craftsmanship',
      description: 'We complete panel beating, rust excision, welding, and high-solid spray painting. Most jobs are finished same-day or next-day.',
      icon: Wrench,
      tag: 'Rapid Turnaround',
    },
    {
      number: '04',
      title: 'Inspect & Drive Away',
      subtitle: '100% satisfaction',
      description: 'Pick up your vehicle looking flawless with factory color match and durable clearcoat. WoF rust repairs certified ready for inspection.',
      icon: CheckCircle,
      tag: 'Backed by 4.4★',
    },
  ];

  return (
    <section id="process" className="py-20 sm:py-28 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 inline-block mb-3">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
            How We Get You Back on the Road Fast
          </h2>
          <p className="mt-4 text-sm sm:text-base text-brand-muted leading-relaxed">
            No complicated paperwork or leaving your vehicle sitting around for weeks. Straightforward, honest, and prompt.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, index) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-brand-card/90 border border-brand-border/80 rounded-3xl p-6 sm:p-7 shadow-glass flex flex-col justify-between hover:border-brand-accent/50 transition-all duration-300 group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-black text-3xl sm:text-4xl text-brand-border group-hover:text-brand-accent transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-brand-dark border border-brand-border flex items-center justify-center text-white group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-300">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full mb-2 inline-block">
                    {step.tag}
                  </span>

                  <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-silver/70 mb-3">
                    {step.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/#quote"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-accent to-red-600 hover:from-red-600 hover:to-brand-accent text-white font-bold text-sm shadow-glow-red hover:shadow-lg transition-all"
          >
            <span>Start Step 1: Send Your Damage Photos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
