'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import { BeforeAfterItem } from '@/types';
import { SlidersHorizontal, Plus, Trash2, X, Save } from 'lucide-react';

export default function BeforeAfterManagerPage() {
  const { beforeAfter, addBeforeAfter, deleteBeforeAfter } = useContent();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [description, setDescription] = useState('');
  const [beforeLabel, setBeforeLabel] = useState('Before: Damage / Prep');
  const [afterLabel, setAfterLabel] = useState('After: Finished Clearcoat');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !vehicle) return;
    addBeforeAfter({
      title,
      vehicle,
      description,
      beforeImageUrl: '/images/ute-paint-booth.png',
      afterImageUrl: '/images/ute-paint-booth.png',
      beforeLabel,
      afterLabel,
    });
    setIsAdding(false);
    setTitle('');
    setVehicle('');
    setDescription('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-2.5">
            <SlidersHorizontal className="w-7 h-7 text-brand-accent" />
            <span>Before / After Comparison Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Configure the interactive slider comparisons shown on the public site.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-glow-red transition-all self-start sm:self-auto min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Comparison Pair</span>
          </button>
        )}
      </div>

      {/* Add Form */}
      {isAdding && (
        <form
          onSubmit={handleSave}
          className="bg-brand-card border border-brand-accent/50 rounded-3xl p-6 sm:p-8 shadow-glass space-y-4"
        >
          <div className="flex items-center justify-between border-b border-brand-border pb-4">
            <h2 className="text-lg font-bold text-white">Add Before & After Pair</h2>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="p-1 rounded-lg text-brand-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Ford Falcon Door Skin Beating"
                className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Vehicle Make / Model *
              </label>
              <input
                type="text"
                required
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="e.g. 2017 Ford Falcon XR6"
                className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Work Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the work performed"
              className="w-full p-3 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-accent hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-glow-red"
            >
              Save Pair
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-xs sm:text-sm text-brand-silver"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Existing Pairs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {beforeAfter.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-brand-card border border-brand-border space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white">{item.title}</h3>
                <p className="text-xs text-brand-muted">{item.vehicle}</p>
              </div>
              <button
                onClick={() => {
                  if (confirm(`Delete "${item.title}"?`)) {
                    deleteBeforeAfter(item.id);
                  }
                }}
                className="p-2 rounded-lg bg-red-950/40 border border-red-800/40 text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-brand-silver">{item.description}</p>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-brand-dark p-2 rounded-xl border border-brand-border">
                <span className="text-[10px] text-red-400 uppercase font-mono block">Before</span>
                <span className="text-white truncate block">{item.beforeLabel}</span>
              </div>
              <div className="bg-brand-dark p-2 rounded-xl border border-brand-border">
                <span className="text-[10px] text-emerald-400 uppercase font-mono block">After</span>
                <span className="text-white truncate block">{item.afterLabel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
