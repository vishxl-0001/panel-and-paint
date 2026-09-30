'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContent } from '@/context/ContentContext';
import { useTheme } from '@/context/ThemeContext';
import { getTelUrl, getWhatsAppUrl } from '@/lib/utils';
import {
  Phone,
  MessageSquare,
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  Shield,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export function Header() {
  const { settings } = useContent();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Services', href: '/#services' },
    { label: 'Before & After', href: '/#before-after' },
    { label: 'Our Process', href: '/#process' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Google Reviews', href: '/#reviews' },
    { label: 'Location & Hours', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 1. Optional Editable Announcement Banner */}
      {settings.announcement.isEnabled && (
        <div className="bg-gradient-to-r from-red-600 via-brand-accent to-orange-600 text-white text-xs sm:text-sm py-1.5 px-4 font-medium shadow-inner flex items-center justify-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-black/25 text-[11px] font-bold uppercase tracking-wider">
            {settings.announcement.badge || 'Notice'}
          </span>
          <span className="truncate max-w-xs sm:max-w-xl">{settings.announcement.text}</span>
          {settings.announcement.linkUrl && (
            <Link
              href={settings.announcement.linkUrl}
              className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:opacity-90 ml-1 whitespace-nowrap"
            >
              {settings.announcement.linkText || 'Details'} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      )}

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-border/80 shadow-glass py-3'
            : 'bg-brand-dark/80 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-accentOrange flex items-center justify-center text-white shadow-glow-red group-hover:scale-105 transition-transform">
              <span className="font-display font-black text-xl tracking-tight">NP</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-brand-accent transition-colors">
                  Ngongotaha
                </span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-brand-border text-brand-muted">
                  Panel & Paint
                </span>
              </div>
              <p className="text-[11px] text-brand-muted tracking-wide flex items-center gap-1">
                <span>Rotorua, NZ</span>
                <span className="w-1 h-1 rounded-full bg-brand-accent inline-block" />
                <span className="text-yellow-400 font-semibold">★ 4.4</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-brand-muted hover:text-white transition-colors relative py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-brand-border/60 text-brand-muted hover:text-white hover:bg-brand-card transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            {/* Quick Phone Call (Desktop / Tablet) */}
            <a
              href={getTelUrl(settings.phone)}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-card hover:bg-brand-cardHover border border-brand-border text-xs font-semibold text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-accent" />
              <span>{settings.phone}</span>
            </a>

            {/* Get Free Quote CTA */}
            <Link
              href="/#quote"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-accent to-red-600 hover:from-red-600 hover:to-brand-accent text-white text-xs sm:text-sm font-bold shadow-glow-red hover:shadow-lg transition-all"
            >
              <span>Get Free Quote</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-brand-border/80 text-brand-silver hover:bg-brand-card transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Full Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] z-50 bg-brand-dark/98 backdrop-blur-xl border-t border-brand-border flex flex-col p-6 overflow-y-auto">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold text-white hover:text-brand-accent py-3 border-b border-brand-border/40 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-brand-muted" />
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-brand-muted hover:text-white py-2 flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-brand-accent" />
              <span>Shop Owner Admin Portal</span>
            </Link>
          </div>

          {/* Quick Direct Actions in Mobile Menu */}
          <div className="mt-8 pt-6 border-t border-brand-border/60 flex flex-col gap-3">
            <a
              href={getTelUrl(settings.phone)}
              className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-brand-accent hover:bg-red-700 text-white font-bold flex items-center justify-center gap-2 shadow-glow-red"
            >
              <Phone className="w-5 h-5" />
              <span>Call Darren: {settings.phone}</span>
            </a>
            <a
              href={getWhatsAppUrl(settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Us Directly</span>
            </a>
          </div>

          <div className="mt-6 text-center text-xs text-brand-muted">
            142 Oturoa Road, Ngongotahā, Rotorua 3072
          </div>
        </div>
      )}
    </header>
  );
}
