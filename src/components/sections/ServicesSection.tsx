'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import { ServiceItem } from '@/types';
import { ServiceModal } from '@/components/ui/ServiceModal';
import {
  Hammer,
  Paintbrush,
  ShieldAlert,
  Sparkles,
  Wrench,
  Clock,
  ArrowRight,
  Check,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Hammer: Hammer,
  Paintbrush: Paintbrush,
  ShieldAlert: ShieldAlert,
  Sparkles: Sparkles,
  Wrench: Wrench,
};

interface ServicesSectionProps {
  onSelectServiceForQuote?: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectServiceForQuote }: ServicesSectionProps) {
  const { services } = useContent();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleSelectService = (title: string) => {
    if (onSelectServiceForQuote) {
      onSelectServiceForQuote(title);
    }
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-brand-dark relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 inline-block mb-3">
            Rotorua Auto Body Services
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
            Precision Panel Beating & High-Gloss Spray Finishes
          </h2>
          <p className="mt-4 text-sm sm:text-base text-brand-muted leading-relaxed">
            From minor carpark dings to full chassis rust cut-outs and oven-baked resprays. Every job is handled with meticulous craftsmanship and honest New Zealand service.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Wrench;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group relative bg-brand-card/90 hover:bg-brand-cardHover border border-brand-border/80 hover:border-brand-accent/60 rounded-3xl p-6 sm:p-7 shadow-glass transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:shadow-glow-red/20"
              >
                <div>
                  {/* Top Bar with Icon & Turnaround Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-dark/90 border border-brand-border flex items-center justify-center text-brand-accent group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-brand-dark/80 text-brand-silver border border-brand-border/60 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brand-accent" />
                      <span>{service.turnaroundTime}</span>
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-brand-accent transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-brand-muted leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>

                  {/* Key Benefits List */}
                  <div className="mt-4 space-y-2 border-t border-brand-border/40 pt-4">
                    {service.keyBenefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-brand-silver">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer with Modal Trigger */}
                <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-silver group-hover:text-white">
                  <span>View Details & Pricing</span>
                  <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center border border-brand-border group-hover:border-brand-accent/50 group-hover:bg-brand-accent group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectServiceForQuote={handleSelectService}
      />
    </section>
  );
}
