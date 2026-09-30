'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';
import { Star, Clock, DollarSign, Award, Wrench, Shield } from 'lucide-react';

export function TrustBar() {
  const { settings } = useContent();

  const trustItems = [
    {
      icon: Star,
      iconColor: 'text-amber-400',
      title: `${settings.googleRating} Stars on Google`,
      subtitle: `Based on ${settings.reviewCount} verified reviews`,
      tag: 'Verified',
    },
    {
      icon: Clock,
      iconColor: 'text-brand-accent',
      title: settings.trustTurnaround || 'Rapid Turnaround',
      subtitle: 'Often same-day or next-day turnaround',
      tag: 'Efficient',
    },
    {
      icon: DollarSign,
      iconColor: 'text-emerald-400',
      title: settings.trustPricing || 'Fair & Honest Pricing',
      subtitle: 'Transparent quotes without hidden fees',
      tag: 'Affordable',
    },
    {
      icon: Award,
      iconColor: 'text-sky-400',
      title: settings.trustWorkmanship || 'Master Workmanship',
      subtitle: 'Chassis rust, panel alignment & oven bake',
      tag: 'Guaranteed',
    },
  ];

  return (
    <div className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-brand-card/95 backdrop-blur-xl border border-brand-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-glass">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-brand-border/60">
          {trustItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 ${
                  index > 1 ? 'pt-4 lg:pt-0' : ''
                } ${index > 0 ? 'lg:pl-6' : ''}`}
              >
                <div className="p-2.5 rounded-xl bg-brand-dark/80 border border-brand-border/80 shrink-0 shadow-sm">
                  <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${item.iconColor}`} />
                </div>
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <h3 className="font-bold text-white text-sm sm:text-base tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-brand-muted mt-0.5 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
