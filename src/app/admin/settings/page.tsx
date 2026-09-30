'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { DayOfWeek } from '@/types';
import { Settings, Save, Clock, MapPin, Phone, Mail, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export default function BusinessSettingsPage() {
  const { settings, updateSettings, resetToDefaults } = useContent();

  const [businessName, setBusinessName] = useState(settings.businessName);
  const [ownerPlaceholder, setOwnerPlaceholder] = useState(settings.ownerPlaceholder);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [emailPlaceholder, setEmailPlaceholder] = useState(settings.emailPlaceholder);
  const [address, setAddress] = useState(settings.address);
  const [holidayNotice, setHolidayNotice] = useState(settings.holidayNotice);
  const [hours, setHours] = useState(settings.openingHours);
  const [accentColor, setAccentColor] = useState(settings.appearance.accentColor);
  const [metaTitle, setMetaTitle] = useState(settings.seo.metaTitle);
  const [metaDescription, setMetaDescription] = useState(settings.seo.metaDescription);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleHourChange = (day: DayOfWeek, field: 'isOpen' | 'openTime' | 'closeTime' | 'note', val: any) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: val,
      },
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      businessName,
      ownerPlaceholder,
      phone,
      whatsapp,
      emailPlaceholder,
      address,
      holidayNotice,
      openingHours: hours,
      appearance: {
        ...settings.appearance,
        accentColor,
      },
      seo: {
        ...settings.seo,
        metaTitle,
        metaDescription,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const days: Array<{ key: DayOfWeek; label: string }> = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-brand-accent" />
            <span>Business & Hours Settings</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Configure contact info, editable daily hours with placeholder tags, and SEO settings.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-500/30">
            Settings Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Contact Information */}
        <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-glass space-y-4">
          <h2 className="text-base font-bold text-white border-b border-brand-border/60 pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-accent" />
            <span>Business Details & Contacts</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Owner Name <span className="text-brand-muted font-normal">(Placeholder)</span>
              </label>
              <input
                type="text"
                value={ownerPlaceholder}
                onChange={(e) => setOwnerPlaceholder(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Workshop Phone (Confirmed)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Physical Workshop Address (Confirmed)
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Email Address <span className="text-brand-muted font-normal">(Placeholder)</span>
            </label>
            <input
              type="text"
              value={emailPlaceholder}
              onChange={(e) => setEmailPlaceholder(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
            />
          </div>
        </div>

        {/* Section 2: Opening Hours per Day (With Clear Placeholders) */}
        <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-glass space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-border/60 pb-3 gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-accent" />
              <span>Workshop Operating Hours</span>
            </h2>
            <span className="text-xs text-brand-muted font-mono">
              [Editable with placeholder labels]
            </span>
          </div>

          <div className="space-y-3">
            {days.map(({ key, label }) => {
              const day = hours[key];
              return (
                <div
                  key={key}
                  className="p-3.5 rounded-2xl bg-brand-dark/70 border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-[120px]">
                    <input
                      type="checkbox"
                      checked={day.isOpen}
                      onChange={(e) => handleHourChange(key, 'isOpen', e.target.checked)}
                      className="w-4 h-4 text-brand-accent rounded border-brand-border bg-brand-dark"
                    />
                    <span className="font-bold text-white text-sm">{label}</span>
                  </div>

                  {day.isOpen ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={day.openTime}
                        onChange={(e) => handleHourChange(key, 'openTime', e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-brand-card border border-brand-border text-white text-xs font-mono"
                      />
                      <span className="text-brand-muted">to</span>
                      <input
                        type="time"
                        value={day.closeTime}
                        onChange={(e) => handleHourChange(key, 'closeTime', e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-brand-card border border-brand-border text-white text-xs font-mono"
                      />
                    </div>
                  ) : (
                    <span className="text-brand-muted font-semibold">Closed</span>
                  )}

                  <input
                    type="text"
                    value={day.note || ''}
                    onChange={(e) => handleHourChange(key, 'note', e.target.value)}
                    placeholder="e.g. [Sample Hours - Editable]"
                    className="px-3 py-1 rounded-lg bg-brand-card border border-brand-border text-[11px] text-brand-muted w-full sm:w-56"
                  />
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Holiday / Closure Notice
            </label>
            <input
              type="text"
              value={holidayNotice}
              onChange={(e) => setHolidayNotice(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              placeholder="e.g. Workshop closed for Waitangi Day / Easter Weekend"
            />
          </div>
        </div>

        {/* Section 3: SEO Settings */}
        <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-glass space-y-4">
          <h2 className="text-base font-bold text-white border-b border-brand-border/60 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-accent" />
            <span>SEO & Meta Tags</span>
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Page Meta Title
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Meta Description
            </label>
            <textarea
              rows={2}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
            />
          </div>
        </div>

        {/* Submit & Reset Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button
            type="submit"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-accent to-red-600 hover:from-red-600 hover:to-brand-accent text-white font-bold text-sm shadow-glow-red hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm('Reset all site content and settings back to confirmed initial defaults?')) {
                resetToDefaults();
                alert('All data has been reset to defaults.');
              }
            }}
            className="text-xs text-brand-muted hover:text-red-400 flex items-center gap-1.5 p-2 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Site to Defaults</span>
          </button>
        </div>
      </form>
    </div>
  );
}
