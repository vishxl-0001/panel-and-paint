'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import { GalleryItem } from '@/types';
import { Image as ImageIcon, Plus, Trash2, Sparkles, X, Upload } from 'lucide-react';

export default function GalleryManagerPage() {
  const { gallery, addGalleryItem, deleteGalleryItem } = useContent();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('Paint Work');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('/images/ute-paint-booth.png');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;
    addGalleryItem({
      title,
      category,
      caption,
      imageUrl,
      isRealWork: true,
    });
    setIsAdding(false);
    setTitle('');
    setCaption('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-2.5">
            <ImageIcon className="w-7 h-7 text-brand-accent" />
            <span>Workshop Gallery Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Manage photos of spray painting, rust restorations, and completed customer vehicles.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-glow-red transition-all self-start sm:self-auto min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Photo</span>
          </button>
        )}
      </div>

      {/* Add Photo Form */}
      {isAdding && (
        <form
          onSubmit={handleSave}
          className="bg-brand-card border border-brand-accent/50 rounded-3xl p-6 sm:p-8 shadow-glass space-y-5"
        >
          <div className="flex items-center justify-between border-b border-brand-border pb-4">
            <h2 className="text-lg font-bold text-white">Add Photo to Gallery</h2>
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
                Photo Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mazda CX-5 Bumper Respray"
                className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              >
                <option value="Paint Work">Paint Work</option>
                <option value="Panel & Dents">Panel & Dents</option>
                <option value="Rust & WoF">Rust & WoF</option>
                <option value="Bumpers & Detailing">Bumpers & Detailing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Caption / Description
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Brief note about the repair techniques or clearcoat used"
              className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Upload Image or Choose from Workshop Photos
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-brand-dark border border-dashed border-brand-border hover:border-brand-accent text-xs font-semibold text-brand-silver flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4 text-brand-accent" />
                <span>Upload file from phone/computer</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFile}
                className="hidden"
              />

              {imageUrl && (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-brand-border shrink-0">
                  <Image src={imageUrl} alt="Upload preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-accent hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-glow-red transition-all"
            >
              Add to Gallery
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden bg-brand-card border border-brand-border shadow-glass group"
          >
            <div className="relative h-44 w-full bg-brand-dark">
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
              {item.isRealWork && (
                <div className="absolute top-2.5 left-2.5 bg-brand-dark/90 px-2 py-0.5 rounded-full border border-brand-accent/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-brand-accent" />
                  <span className="text-[10px] font-bold text-white uppercase">Real Photo</span>
                </div>
              )}
              <button
                onClick={() => {
                  if (confirm(`Delete "${item.title}" from gallery?`)) {
                    deleteGalleryItem(item.id);
                  }
                }}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 opacity-90 transition-opacity"
                title="Delete photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-accent">
                {item.category}
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5 line-clamp-1">{item.title}</h3>
              {item.caption && (
                <p className="text-xs text-brand-muted mt-1 line-clamp-2">{item.caption}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
