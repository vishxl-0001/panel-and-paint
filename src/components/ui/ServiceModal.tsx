'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ServiceItem } from '@/types';
import { X, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export function ServiceModal({ service, onClose, onSelectServiceForQuote }: ServiceModalProps) {
  useEffect(() => {
    if (!service) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-brand-card border border-brand-border rounded-3xl overflow-hidden shadow-2xl animate-scaleUp my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close service details"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-brand-dark/80 hover:bg-brand-cardHover border border-brand-border text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="relative w-full h-48 sm:h-64 bg-brand-dark">
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-dark/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent px-2.5 py-1 rounded bg-brand-dark/80 border border-brand-accent/30 inline-block mb-2">
              Rotorua Workshop Service
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white drop-shadow-md">
              {service.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Turnaround Badge */}
          <div className="flex items-center gap-2 text-sm text-brand-silver bg-brand-dark/60 p-3 rounded-xl border border-brand-border/60">
            <Clock className="w-4 h-4 text-brand-accent" />
            <span className="font-semibold text-white">Expected Turnaround:</span>
            <span>{service.turnaroundTime}</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-2">
              Overview & Technical Standard
            </h3>
            <p className="text-sm sm:text-base text-brand-silver leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Key Advantages */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-3">
              What We Guarantee
            </h3>
            <div className="space-y-2.5">
              {service.keyBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-white/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-brand-border flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onSelectServiceForQuote(service.title);
                onClose();
              }}
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-brand-accent to-red-600 hover:from-red-600 hover:to-brand-accent text-white font-bold text-sm shadow-glow-red flex items-center justify-center gap-2 transition-all min-h-[44px]"
            >
              <span>Get Free Quote for This</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="py-3 px-5 rounded-xl bg-brand-dark hover:bg-brand-cardHover border border-brand-border text-sm font-semibold text-brand-muted hover:text-white transition-colors min-h-[44px]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
