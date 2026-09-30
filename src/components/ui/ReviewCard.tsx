'use client';

import React from 'react';
import { ReviewItem } from '@/types';
import { Star, ShieldCheck, Quote } from 'lucide-react';

interface ReviewCardProps {
  review: ReviewItem;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-brand-card/90 border border-brand-border/80 shadow-glass relative group hover:border-brand-accent/50 transition-all duration-300">
      {/* Decorative subtle quotation mark */}
      <Quote className="absolute top-4 right-4 w-8 h-8 text-brand-border/40 pointer-events-none group-hover:text-brand-accent/20 transition-colors" />

      <div>
        {/* Rating Stars & Source Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted bg-brand-border/40 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="text-[#4285F4] font-black">G</span>
            <span>{review.source}</span>
          </span>
        </div>

        {/* Exact Review Text */}
        <p className="text-sm sm:text-base text-brand-silver leading-relaxed italic">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      {/* Reviewer Details */}
      <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm sm:text-base">
              {review.authorName}
            </span>
            {review.isLocalGuide && (
              <span className="text-[10px] font-semibold text-orange-400 bg-orange-950/60 border border-orange-500/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Local Guide
              </span>
            )}
          </div>
          <p className="text-[11px] text-brand-muted mt-0.5">Verified Customer</p>
        </div>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-border to-brand-card flex items-center justify-center text-xs font-bold text-brand-silver border border-white/10">
          {review.authorName.charAt(0)}
        </div>
      </div>
    </div>
  );
}
