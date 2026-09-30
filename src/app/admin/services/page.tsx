'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { ServiceItem } from '@/types';
import { Wrench, Plus, Edit2, Trash2, CheckCircle2, Clock, X, Save } from 'lucide-react';

export default function ServicesManagerPage() {
  const { services, addService, updateService, deleteService } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Omit<ServiceItem, 'id' | 'order'>>({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    turnaroundTime: '1 - 2 Days',
    iconName: 'Wrench',
    imageUrl: '/images/ute-paint-booth.png',
    keyBenefits: ['Master craftsmanship', 'Fair pricing', 'Fast turnaround'],
    isFeatured: true,
  });

  const handleStartAdd = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      turnaroundTime: '1 - 2 Days',
      iconName: 'Wrench',
      imageUrl: '/images/ute-paint-booth.png',
      keyBenefits: ['Master craftsmanship', 'Fair pricing', 'Fast turnaround'],
      isFeatured: true,
    });
  };

  const handleStartEdit = (service: ServiceItem) => {
    setEditingId(service.id);
    setIsAddingNew(false);
    setFormData({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      turnaroundTime: service.turnaroundTime,
      iconName: service.iconName,
      imageUrl: service.imageUrl,
      keyBenefits: service.keyBenefits,
      isFeatured: service.isFeatured,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddingNew) {
      addService(formData);
      setIsAddingNew(false);
    } else if (editingId) {
      updateService(editingId, formData);
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-2.5">
            <Wrench className="w-7 h-7 text-brand-accent" />
            <span>Services Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Add, update, or remove repair services offered at the workshop.
          </p>
        </div>

        {!isAddingNew && !editingId && (
          <button
            onClick={handleStartAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-glow-red transition-all self-start sm:self-auto min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal */}
      {(isAddingNew || editingId) && (
        <form
          onSubmit={handleSave}
          className="bg-brand-card border border-brand-accent/50 rounded-3xl p-6 sm:p-8 shadow-glass space-y-5"
        >
          <div className="flex items-center justify-between border-b border-brand-border pb-4">
            <h2 className="text-lg font-bold text-white">
              {isAddingNew ? 'Add New Workshop Service' : 'Edit Service'}
            </h2>
            <button
              type="button"
              onClick={() => {
                setIsAddingNew(false);
                setEditingId(null);
              }}
              className="p-1 rounded-lg text-brand-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Service Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
                placeholder="e.g. Headlight Restoration"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Expected Turnaround *
              </label>
              <input
                type="text"
                required
                value={formData.turnaroundTime}
                onChange={(e) => setFormData({ ...formData, turnaroundTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
                placeholder="e.g. Same-Day or 1-2 Days"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Short Summary (Card Preview) *
            </label>
            <input
              type="text"
              required
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              placeholder="Brief 1-line description shown on service cards"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Full Description (Modal Detail) *
            </label>
            <textarea
              rows={3}
              required
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              className="w-full p-4 rounded-xl bg-brand-dark border border-brand-border text-sm text-white leading-relaxed focus:outline-none focus:border-brand-accent"
              placeholder="Detailed description of repair methods and technical quality"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-accent hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-glow-red transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Service</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAddingNew(false);
                setEditingId(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-dark hover:bg-brand-cardHover border border-brand-border text-xs sm:text-sm text-brand-silver"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-5 rounded-2xl bg-brand-card border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-border/80 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-bold text-white">{service.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-dark text-brand-muted border border-brand-border font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-brand-accent" />
                  <span>{service.turnaroundTime}</span>
                </span>
              </div>
              <p className="text-xs text-brand-muted line-clamp-1 max-w-xl">
                {service.shortDescription}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleStartEdit(service)}
                className="p-2.5 rounded-xl bg-brand-dark hover:bg-brand-cardHover border border-brand-border text-brand-silver hover:text-white transition-colors"
                title="Edit service"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete service "${service.title}"?`)) {
                    deleteService(service.id);
                  }
                }}
                className="p-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-400 hover:text-red-300 transition-colors"
                title="Delete service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
