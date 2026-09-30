'use client';

import React from 'react';
import Link from 'next/link';
import { QuoteFormSection } from '@/components/sections/QuoteFormSection';
import { ArrowLeft, Phone, MessageSquare } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { getTelUrl, getWhatsAppUrl } from '@/lib/utils';

export default function StandaloneQuotePage() {
  const { settings } = useContent();

  return (
    <div className="min-h-screen bg-brand-dark pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <QuoteFormSection />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 text-center border-t border-brand-border/60 pt-8">
        <p className="text-sm text-brand-muted mb-4">Prefer speaking directly with Darren?</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={getTelUrl(settings.phone)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-card hover:bg-brand-cardHover border border-brand-border text-white text-sm font-bold transition-colors"
          >
            <Phone className="w-4 h-4 text-brand-accent" />
            <span>Call {settings.phone}</span>
          </a>
          <a
            href={getWhatsAppUrl(settings.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-400 text-sm font-bold transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Photos on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
