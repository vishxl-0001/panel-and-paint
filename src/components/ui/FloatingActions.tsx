'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import { getTelUrl, getWhatsAppUrl } from '@/lib/utils';
import { Phone, MessageSquare, FileText, ArrowUp } from 'lucide-react';

export function FloatingActions() {
  const { settings } = useContent();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Thin Scroll Progress Indicator Bar at top */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-brand-accent via-orange-500 to-yellow-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Scroll to Top Floating Button (Desktop & Mobile) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 p-3 rounded-full bg-brand-card/90 hover:bg-brand-cardHover border border-brand-border text-white shadow-glass hover:scale-110 transition-all backdrop-blur-md"
        >
          <ArrowUp className="w-5 h-5 text-brand-accent" />
        </button>
      )}

      {/* 3. Sticky Bottom Mobile Action Bar (Call, WhatsApp, Get Quote) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-dark/95 backdrop-blur-lg border-t border-brand-border/80 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl">
        <div className="grid grid-cols-3 gap-2">
          {/* Quick Call */}
          <a
            href={getTelUrl(settings.phone)}
            className="flex flex-col items-center justify-center min-h-[44px] py-1.5 px-2 rounded-xl bg-brand-card hover:bg-brand-cardHover border border-brand-border text-white active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 text-brand-accent mb-0.5" />
            <span className="text-[11px] font-bold tracking-tight">Call Now</span>
          </a>

          {/* WhatsApp */}
          <a
            href={getWhatsAppUrl(settings.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center min-h-[44px] py-1.5 px-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-400 active:scale-95 transition-transform"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400 mb-0.5" />
            <span className="text-[11px] font-bold tracking-tight">WhatsApp</span>
          </a>

          {/* Free Quote */}
          <Link
            href="/#quote"
            className="flex flex-col items-center justify-center min-h-[44px] py-1.5 px-2 rounded-xl bg-gradient-to-r from-brand-accent to-red-600 text-white font-bold shadow-glow-red active:scale-95 transition-transform"
          >
            <FileText className="w-4 h-4 text-white mb-0.5" />
            <span className="text-[11px] font-bold tracking-tight">Free Quote</span>
          </Link>
        </div>
      </div>
    </>
  );
}
