'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { FileEdit, Save, Sparkles, CheckCircle2, Megaphone, Eye } from 'lucide-react';

export function SiteContentEditorPage() {
  const { settings, updateSettings } = useContent();
  const [formData, setFormData] = useState({
    heroHeadline: settings.heroHeadline,
    heroSubheadline: settings.heroSubheadline,
    trustTurnaround: settings.trustTurnaround,
    trustPricing: settings.trustPricing,
    trustWorkmanship: settings.trustWorkmanship,
    announcementEnabled: settings.announcement.isEnabled,
    announcementBadge: settings.announcement.badge,
    announcementText: settings.announcement.text,
    announcementLinkText: settings.announcement.linkText || '',
    announcementLinkUrl: settings.announcement.linkUrl || '',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      heroHeadline: formData.heroHeadline,
      heroSubheadline: formData.heroSubheadline,
      trustTurnaround: formData.trustTurnaround,
      trustPricing: formData.trustPricing,
      trustWorkmanship: formData.trustWorkmanship,
      announcement: {
        isEnabled: formData.announcementEnabled,
        badge: formData.announcementBadge,
        text: formData.announcementText,
        linkText: formData.announcementLinkText,
        linkUrl: formData.announcementLinkUrl,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-2.5">
            <FileEdit className="w-7 h-7 text-brand-accent" />
            <span>Site Content Editor</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Update hero headlines, trust statements, and top announcement banner with instant preview.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Changes Published Live!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Announcement Banner */}
        <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-glass space-y-5">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">Top Announcement Banner</h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.announcementEnabled}
                onChange={(e) => setFormData({ ...formData, announcementEnabled: e.target.checked })}
                className="w-4 h-4 text-brand-accent rounded border-brand-border bg-brand-dark focus:ring-brand-accent"
              />
              <span className="text-xs font-semibold text-brand-silver">
                {formData.announcementEnabled ? 'Enabled (Visible)' : 'Disabled'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Badge Tag
              </label>
              <input
                type="text"
                value={formData.announcementBadge}
                onChange={(e) => setFormData({ ...formData, announcementBadge: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
                placeholder="e.g. Holiday Notice, Open Today"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Announcement Message
              </label>
              <input
                type="text"
                value={formData.announcementText}
                onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
                placeholder="Message displayed across top of website..."
              />
            </div>
          </div>
        </div>

        {/* Section 2: Hero Section Headlines */}
        <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-glass space-y-5">
          <div className="flex items-center gap-2 border-b border-brand-border/60 pb-4">
            <Sparkles className="w-5 h-5 text-brand-accent" />
            <h2 className="text-base font-bold text-white">Hero Banner Content</h2>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Primary Headline
            </label>
            <input
              type="text"
              value={formData.heroHeadline}
              onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-brand-border text-base font-bold text-white focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Subheadline / Description
            </label>
            <textarea
              rows={3}
              value={formData.heroSubheadline}
              onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
              className="w-full p-4 rounded-xl bg-brand-dark border border-brand-border text-sm text-white leading-relaxed focus:outline-none focus:border-brand-accent"
            />
          </div>
        </div>

        {/* Section 3: Trust Bar Highlights */}
        <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-glass space-y-5">
          <h2 className="text-base font-bold text-white border-b border-brand-border/60 pb-4">
            Trust Bar Copy
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Turnaround Highlight
              </label>
              <input
                type="text"
                value={formData.trustTurnaround}
                onChange={(e) => setFormData({ ...formData, trustTurnaround: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Pricing Highlight
              </label>
              <input
                type="text"
                value={formData.trustPricing}
                onChange={(e) => setFormData({ ...formData, trustPricing: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Workmanship Highlight
              </label>
              <input
                type="text"
                value={formData.trustWorkmanship}
                onChange={(e) => setFormData({ ...formData, trustWorkmanship: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-accent to-red-600 hover:from-red-600 hover:to-brand-accent text-white font-bold text-sm shadow-glow-red hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Changes to Live Site</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SiteContentEditorPage;
