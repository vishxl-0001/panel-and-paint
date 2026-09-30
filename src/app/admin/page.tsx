'use client';

import React from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import { getTelUrl, getWhatsAppUrl } from '@/lib/utils';
import {
  Inbox,
  Clock,
  CheckCircle,
  AlertCircle,
  FileEdit,
  Wrench,
  Image as ImageIcon,
  Star,
  Settings,
  ArrowRight,
  Phone,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { quotes, services, gallery, reviews, settings } = useContent();

  const newQuotes = quotes.filter((q) => q.status === 'new');
  const contactedQuotes = quotes.filter((q) => q.status === 'contacted');
  const completedQuotes = quotes.filter((q) => q.status === 'completed');

  const recentQuotes = quotes.slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-card via-brand-cardHover to-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-glass flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-brand-accent font-bold px-2.5 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/30 inline-block mb-2">
            Ngongotaha Workshop Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Welcome back, {settings.ownerPlaceholder.replace(/[[\]]/g, '')}
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Manage quote requests, site copy, services, and photo gallery all from your phone or computer.
          </p>
        </div>

        <Link
          href="/admin/quotes"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-accent to-red-600 hover:from-red-600 hover:to-brand-accent text-white font-bold text-sm shadow-glow-red transition-all shrink-0 min-h-[44px]"
        >
          <Inbox className="w-4 h-4" />
          <span>Open Quotes Inbox</span>
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-5 shadow-glass">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-brand-muted">New Quotes</span>
            <div className="w-8 h-8 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-display font-bold text-white mt-3">
            {newQuotes.length}
          </p>
          <p className="text-[11px] text-brand-muted mt-1">Awaiting your response</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-5 shadow-glass">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-brand-muted">Active Services</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-display font-bold text-white mt-3">
            {services.length}
          </p>
          <p className="text-[11px] text-brand-muted mt-1">Displayed on public site</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-5 shadow-glass">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-brand-muted">Google Rating</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-display font-bold text-white mt-3">
            {settings.googleRating}
          </p>
          <p className="text-[11px] text-brand-muted mt-1">Based on {settings.reviewCount} verified reviews</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-5 shadow-glass">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-brand-muted">Gallery Photos</span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-display font-bold text-white mt-3">
            {gallery.length}
          </p>
          <p className="text-[11px] text-brand-muted mt-1">Including real workshop booth</p>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div>
        <h2 className="text-base font-bold text-white mb-4">Quick Management Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Link
            href="/admin/content"
            className="p-4 rounded-2xl bg-brand-card hover:bg-brand-cardHover border border-brand-border text-left transition-all hover:-translate-y-0.5 group"
          >
            <FileEdit className="w-5 h-5 text-brand-accent mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-xs sm:text-sm font-bold text-white">Edit Hero Copy</h3>
            <p className="text-[11px] text-brand-muted mt-0.5">Headlines & subtexts</p>
          </Link>

          <Link
            href="/admin/services"
            className="p-4 rounded-2xl bg-brand-card hover:bg-brand-cardHover border border-brand-border text-left transition-all hover:-translate-y-0.5 group"
          >
            <Wrench className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-xs sm:text-sm font-bold text-white">Services</h3>
            <p className="text-[11px] text-brand-muted mt-0.5">Add / edit repair items</p>
          </Link>

          <Link
            href="/admin/gallery"
            className="p-4 rounded-2xl bg-brand-card hover:bg-brand-cardHover border border-brand-border text-left transition-all hover:-translate-y-0.5 group"
          >
            <ImageIcon className="w-5 h-5 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-xs sm:text-sm font-bold text-white">Workshop Photos</h3>
            <p className="text-[11px] text-brand-muted mt-0.5">Upload spray & panel photos</p>
          </Link>

          <Link
            href="/admin/settings"
            className="p-4 rounded-2xl bg-brand-card hover:bg-brand-cardHover border border-brand-border text-left transition-all hover:-translate-y-0.5 group"
          >
            <Settings className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-xs sm:text-sm font-bold text-white">Shop Hours</h3>
            <p className="text-[11px] text-brand-muted mt-0.5">Update daily schedule</p>
          </Link>
        </div>
      </div>

      {/* Recent Quotes Inbox Feed */}
      <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-glass">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Recent Customer Quote Requests</h2>
            <p className="text-xs text-brand-muted">Latest inquiries from the public website</p>
          </div>
          <Link
            href="/admin/quotes"
            className="text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1"
          >
            <span>View All ({quotes.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentQuotes.length === 0 ? (
          <div className="py-12 text-center text-sm text-brand-muted">
            No quote requests received yet.
          </div>
        ) : (
          <div className="space-y-3.5">
            {recentQuotes.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-brand-dark/80 border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{q.name}</span>
                    <span className="text-xs text-brand-muted">•</span>
                    <span className="text-xs text-brand-silver font-medium">
                      {q.vehicleMake} {q.vehicleModel} {q.vehicleYear ? `(${q.vehicleYear})` : ''}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        q.status === 'new'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : q.status === 'contacted'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted mt-1 line-clamp-1">{q.description}</p>
                </div>

                {/* 1-Tap Customer Contact Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={getTelUrl(q.phone)}
                    className="p-2.5 rounded-xl bg-brand-card hover:bg-brand-cardHover border border-brand-border text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    title={`Call ${q.name}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-accent" />
                    <span>Call</span>
                  </a>

                  <a
                    href={getWhatsAppUrl(q.phone, `Hi ${q.name}, Darren from Ngongotaha Panel & Paint here regarding your ${q.vehicleMake} ${q.vehicleModel}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    title={`WhatsApp ${q.name}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
