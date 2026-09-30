'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';
import { calculateShopStatus, getTelUrl, getWhatsAppUrl } from '@/lib/utils';
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Navigation,
  ExternalLink,
  Shield,
  Sparkles,
} from 'lucide-react';

export function ContactLocationSection() {
  const { settings } = useContent();
  const shopStatus = calculateShopStatus(settings.openingHours);

  const daysList: Array<{ key: keyof typeof settings.openingHours; label: string }> = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 bg-brand-card/40 border-t border-brand-border/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 inline-flex items-center gap-1.5 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Workshop Location & Hours</span>
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
            Find Us in Ngongotahā, Rotorua
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed">
            Conveniently situated on Oturoa Road with easy vehicle access and free on-site parking for assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Workshop Details, Live Status & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Status Card */}
            <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-7 shadow-glass space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      shopStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
                    }`}
                  />
                  <span
                    className={`font-display font-bold text-base uppercase tracking-wider ${
                      shopStatus.isOpen ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {shopStatus.statusText}
                  </span>
                </div>
                <span className="text-xs font-mono text-brand-muted">Pacific/Auckland</span>
              </div>
              <p className="text-xs text-brand-silver">{shopStatus.nextChangeText}</p>

              {/* Quick Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={getTelUrl(settings.phone)}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl bg-brand-accent hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow-red transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {settings.phone}</span>
                </a>
                <a
                  href={getWhatsAppUrl(settings.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Address & Directions Card */}
            <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-7 shadow-glass space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Navigation className="w-4 h-4 text-brand-accent" />
                <span>Workshop Address</span>
              </h3>
              <p className="text-sm text-brand-silver leading-relaxed">
                {settings.address}
              </p>

              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent hover:underline pt-1"
              >
                <span>Open in Google Maps / Apple Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Weekly Hours Table */}
            <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-7 shadow-glass space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-accent" />
                  <span>Workshop Hours</span>
                </h3>
                <span className="text-[10px] text-brand-muted/70 font-mono">[Editable in Admin]</span>
              </div>

              <div className="space-y-2 divide-y divide-brand-border/40 text-xs">
                {daysList.map(({ key, label }) => {
                  const day = settings.openingHours[key];
                  return (
                    <div key={key} className="pt-2 flex items-center justify-between">
                      <span className="font-medium text-white">{label}</span>
                      <span className={day.isOpen ? 'text-brand-silver font-mono' : 'text-brand-muted'}>
                        {day.isOpen ? `${day.openTime} – ${day.closeTime}` : 'Closed'}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[11px] text-brand-muted/70 pt-2 italic">
                * Note: Hours are editable placeholders. Please call or WhatsApp ahead to confirm workshop schedule.
              </p>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-7 h-[360px] sm:h-[480px] lg:h-[580px] rounded-3xl overflow-hidden border border-brand-border shadow-glass relative bg-brand-dark">
            <iframe
              src={settings.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ngongotaha Panel & Paint Google Maps Location"
              className="w-full h-full"
            />

            {/* Overlay pill on map */}
            <div className="absolute top-4 left-4 bg-brand-dark/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 shadow-lg flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-ping" />
              <div>
                <p className="text-xs font-bold text-white">Ngongotaha Panel & Paint</p>
                <p className="text-[11px] text-brand-muted">142 Oturoa Road, Ngongotahā</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
