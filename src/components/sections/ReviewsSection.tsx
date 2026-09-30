'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { Star, ChevronLeft, ChevronRight, ExternalLink, ShieldCheck } from 'lucide-react';

export function ReviewsSection() {
  const { reviews, settings } = useContent();
  const visibleReviews = reviews.filter((r) => r.isVisible);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? visibleReviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === visibleReviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-brand-dark relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Honest 4.4 Google Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card border border-brand-border text-xs font-semibold text-brand-silver mb-3">
              <span className="text-[#4285F4] font-black text-sm">G</span>
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
              Real Reviews from Real Rotorua Drivers
            </h2>
            <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed">
              Every word below is taken verbatim from our public Google Maps profile. We take pride in fast turnaround, fair pricing, and honest advice.
            </p>
          </div>

          {/* Honest Rating Banner */}
          <div className="bg-brand-card/90 border border-brand-border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 shrink-0 shadow-glass">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-3xl text-white">
                  {settings.googleRating}
                </span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/50 text-amber-400/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-brand-muted mt-0.5">
                4.4 on Google • Based on {settings.reviewCount} reviews
              </p>
            </div>

            <a
              href={settings.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-dark hover:bg-brand-cardHover border border-brand-border text-xs font-semibold text-brand-silver hover:text-white transition-colors"
            >
              <span>Read on Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-accent" />
            </a>
          </div>
        </div>

        {/* Desktop View: Grid of cards */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Mobile & Tablet View: Swipeable Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden py-2">
            {visibleReviews[currentIndex] && (
              <div className="min-h-[220px]">
                <ReviewCard review={visibleReviews[currentIndex]} />
              </div>
            )}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-brand-border/60">
            <div className="flex items-center gap-1.5">
              {visibleReviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'w-6 bg-brand-accent' : 'w-2 bg-brand-border'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                aria-label="Previous review"
                className="p-2.5 rounded-xl bg-brand-card hover:bg-brand-cardHover border border-brand-border text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                aria-label="Next review"
                className="p-2.5 rounded-xl bg-brand-card hover:bg-brand-cardHover border border-brand-border text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
