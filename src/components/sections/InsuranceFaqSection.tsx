'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { ChevronDown, HelpCircle, Shield, FileCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function InsuranceFaqSection() {
  const { faqs } = useContent();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-brand-dark relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Insurance Highlights Banner */}
        <div className="bg-gradient-to-br from-brand-card via-brand-dark to-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 mb-16 shadow-glass">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-2 text-brand-accent text-xs font-mono uppercase tracking-wider font-bold">
                <Shield className="w-4 h-4" />
                <span>Insurance & Private Work</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Private Repairs & Insurance Claims Welcomed
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Whether you need a private quote to save on paying high insurance excess, or need professional panel beating for an insurance job, we provide prompt, transparent estimates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5">
              <Link
                href="/#quote"
                className="w-full py-3 px-4 rounded-xl bg-brand-accent hover:bg-red-700 text-white font-bold text-xs sm:text-sm text-center shadow-glow-red transition-all"
              >
                Request Insurance Estimate
              </Link>
              <div className="text-center text-[11px] text-brand-muted">
                Fast turnarounds for all major makes
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 inline-flex items-center gap-1.5 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted">
            Clear, honest answers about repair times, rust certifications, and quotes.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-brand-card/90 border border-brand-border/80 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-brand-dark border border-brand-border flex items-center justify-center shrink-0 text-brand-silver transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-brand-accent border-brand-accent text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-brand-border/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
