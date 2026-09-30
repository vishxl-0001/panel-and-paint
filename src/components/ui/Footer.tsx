'use client';

import React from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import { calculateShopStatus, getTelUrl, getWhatsAppUrl } from '@/lib/utils';
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Shield,
  ArrowRight,
  Star,
  ExternalLink,
} from 'lucide-react';

export function Footer() {
  const { settings } = useContent();
  const shopStatus = calculateShopStatus(settings.openingHours);

  return (
    <footer className="bg-brand-dark border-t border-brand-border/80 pt-16 pb-28 md:pb-16 text-brand-silver">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-brand-border/60">
          {/* Column 1: Brand & Overview */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-accentOrange flex items-center justify-center text-white shadow-glow-red">
                <span className="font-display font-black text-xl">NP</span>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white">Ngongotaha</span>
                <span className="block text-[11px] font-semibold text-brand-muted tracking-widest uppercase">
                  Panel & Paint
                </span>
              </div>
            </Link>

            <p className="text-sm text-brand-muted leading-relaxed">
              Precision panel beating, spray painting, chassis rust repair, and bumper fixes in Ngongotahā, Rotorua. Fast turnarounds and honest craftsmanship.
            </p>

            {/* Google Rating Pill */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-card border border-brand-border/60 text-xs">
              <span className="text-[#4285F4] font-black text-sm">G</span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold text-white">4.4</span>
              </div>
              <span className="text-brand-muted">based on 7 Google reviews</span>
            </div>
          </div>

          {/* Column 2: Confirmed Core Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Workshop Services
            </h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li>
                <Link href="/#services" className="hover:text-brand-accent transition-colors">
                  Panel Beating & Chassis Realignment
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-brand-accent transition-colors">
                  Spray Painting & Mirror Clearcoats
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-brand-accent transition-colors">
                  Rust Repair & WoF Compliance
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-brand-accent transition-colors">
                  Dent & Ding Removal
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-brand-accent transition-colors">
                  Bumper Repair & Emergency Fixes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Live Hours & Workshop Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Workshop Hours & Status
            </h4>

            {/* Realtime Live Status Badge */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  shopStatus.isOpen ? 'bg-emerald-500 animate-ping' : 'bg-red-500'
                }`}
              />
              <span className={`text-xs font-bold uppercase tracking-wider ${shopStatus.isOpen ? 'text-emerald-400' : 'text-red-400'}`}>
                {shopStatus.statusText}
              </span>
            </div>
            <p className="text-xs text-brand-muted">{shopStatus.nextChangeText}</p>

            {/* Schedule Summary (Clearly noted as placeholder) */}
            <div className="text-xs text-brand-muted space-y-1 pt-1">
              <div className="flex justify-between">
                <span>Mon – Fri:</span>
                <span className="text-brand-silver">8:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sat:</span>
                <span className="text-brand-silver">8:30 AM – 12:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sun:</span>
                <span className="text-brand-muted">Closed</span>
              </div>
              <p className="text-[10px] text-brand-muted/70 italic pt-1">
                * [Hours shown above are editable placeholders. Call to confirm availability]
              </p>
            </div>
          </div>

          {/* Column 4: Contact & Direct Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Contact & Directions
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-brand-muted">
              <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <span>{settings.address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-brand-silver">
              <Phone className="w-4 h-4 text-brand-accent shrink-0" />
              <a href={getTelUrl(settings.phone)} className="hover:text-brand-accent font-semibold">
                {settings.phone}
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={getWhatsAppUrl(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-400 text-xs font-bold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                href="/admin"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-brand-card hover:bg-brand-cardHover border border-brand-border text-xs text-brand-muted hover:text-white transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-brand-accent" />
                <span>Owner Admin Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>
            &copy; {new Date().getFullYear()} Ngongotaha Panel & Paint. All rights reserved. Rotorua, New Zealand.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy & Terms
            </Link>
            <span>•</span>
            <Link href="/quote" className="hover:text-white transition-colors">
              Request Quote
            </Link>
            <span>•</span>
            <span className="text-[11px] text-brand-muted/70">
              [Owner: Darren (Confirmed from Reviews)]
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
