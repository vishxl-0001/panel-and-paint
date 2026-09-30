'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function PrivacyPage() {
  const { settings } = useContent();

  return (
    <div className="min-h-screen bg-brand-dark py-12 sm:py-20 text-brand-silver">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-brand-card/90 border border-brand-border rounded-3xl p-6 sm:p-10 shadow-glass space-y-6">
          <div className="flex items-center gap-3 border-b border-brand-border/60 pb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Privacy Policy & Terms</h1>
              <p className="text-xs text-brand-muted">Ngongotaha Panel & Paint • Rotorua, New Zealand</p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-brand-silver">
            <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
            <p>
              When you submit a quote request on our website, we collect your name, phone number, vehicle information, damage descriptions, and any uploaded photographs. This information is collected solely to assess vehicle damage and prepare an accurate estimate.
            </p>

            <h2 className="text-base font-bold text-white">2. How We Use Your Information</h2>
            <p>
              Your contact details are used exclusively by Ngongotaha Panel & Paint to communicate with you regarding your repair request. We never sell, lease, or share your personal information with third-party advertisers.
            </p>

            <h2 className="text-base font-bold text-white">3. Image Uploads & Estimates</h2>
            <p>
              Photographs submitted through the website or via WhatsApp are utilized strictly for mechanical and cosmetic assessment of the vehicle. All preliminary estimates based on photos are subject to physical verification of hidden chassis or underlying damage at our workshop.
            </p>

            <h2 className="text-base font-bold text-white">4. Workshop Inquiries</h2>
            <p>
              For questions regarding our privacy practices or to remove your contact information from our records, please contact us at {settings.address} or call {settings.phone}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
