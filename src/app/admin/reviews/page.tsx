'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { ReviewItem } from '@/types';
import { Star, Plus, Eye, EyeOff, Trash2, Edit2, ShieldCheck, X, Save, ExternalLink } from 'lucide-react';

export default function ReviewsManagerPage() {
  const { reviews, addReview, updateReview, toggleReviewVisibility, deleteReview, settings, updateSettings } = useContent();
  const [isAdding, setIsAdding] = useState(false);
  const [googleReviewsUrlInput, setGoogleReviewsUrlInput] = useState(settings.googleReviewsUrl);

  // Form State
  const [authorName, setAuthorName] = useState('');
  const [isLocalGuide, setIsLocalGuide] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [source, setSource] = useState('Google Reviews');

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !text) return;
    addReview({
      authorName,
      isLocalGuide,
      rating,
      text,
      date: date || undefined,
      source: source || 'Google Reviews',
      isVisible: true,
    });
    setIsAdding(false);
    setAuthorName('');
    setText('');
    setDate('');
  };

  const handleUpdateGoogleUrl = () => {
    updateSettings({ googleReviewsUrl: googleReviewsUrlInput });
    alert('Google Reviews Link updated successfully!');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-2.5">
            <Star className="w-7 h-7 text-amber-400 fill-amber-400" />
            <span>Google Reviews Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Displaying honest 4.4 rating with verified Google customer quotes. Hide, show, or add new verified reviews.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-glow-red transition-all self-start sm:self-auto min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Manual Review</span>
          </button>
        )}
      </div>

      {/* Google Reviews URL setting */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:flex-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-1">
            &quot;Read all reviews on Google&quot; URL
          </label>
          <input
            type="url"
            value={googleReviewsUrlInput}
            onChange={(e) => setGoogleReviewsUrlInput(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-brand-dark border border-brand-border text-xs sm:text-sm text-white focus:outline-none focus:border-brand-accent"
          />
        </div>
        <button
          onClick={handleUpdateGoogleUrl}
          className="px-4 py-2 rounded-xl bg-brand-dark hover:bg-brand-card border border-brand-border text-xs font-bold text-brand-silver hover:text-white transition-colors self-end sm:self-auto"
        >
          Save Link
        </button>
      </div>

      {/* Add Manual Review Modal */}
      {isAdding && (
        <form
          onSubmit={handleSaveReview}
          className="bg-brand-card border border-brand-accent/50 rounded-3xl p-6 sm:p-8 shadow-glass space-y-4"
        >
          <div className="flex items-center justify-between border-b border-brand-border pb-4">
            <h2 className="text-lg font-bold text-white">Add Customer Review</h2>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="p-1 rounded-lg text-brand-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Reviewer Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Alison W."
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Star Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              >
                <option value={5}>5 Stars (★★★★★)</option>
                <option value={4}>4 Stars (★★★★☆)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Review Date (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. March 2024"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Exact Review Text *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Paste exact wording without embellishments..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isLocalGuide}
                onChange={(e) => setIsLocalGuide(e.target.checked)}
                className="w-4 h-4 text-brand-accent rounded border-brand-border bg-brand-dark"
              />
              <span className="text-xs font-semibold text-brand-silver">Author is a Google Local Guide</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-accent hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-glow-red"
            >
              Add Review
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

      {/* Reviews Table / List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className={`p-5 rounded-2xl border transition-all ${
              rev.isVisible
                ? 'bg-brand-card border-brand-border'
                : 'bg-brand-dark/40 border-brand-border/40 opacity-60'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-base text-white">{rev.authorName}</span>
                {rev.isLocalGuide && (
                  <span className="text-[10px] text-orange-400 bg-orange-950/50 border border-orange-500/30 px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3 h-3" /> Local Guide
                  </span>
                )}
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleReviewVisibility(rev.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    rev.isVisible
                      ? 'bg-brand-dark text-emerald-400 border border-emerald-500/30'
                      : 'bg-brand-dark text-brand-muted border border-brand-border'
                  }`}
                  title={rev.isVisible ? 'Hide from public site' : 'Show on public site'}
                >
                  {rev.isVisible ? (
                    <>
                      <Eye className="w-3.5 h-3.5" /> <span>Visible</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" /> <span>Hidden</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Delete review from "${rev.authorName}"?`)) {
                      deleteReview(rev.id);
                    }
                  }}
                  className="p-1.5 rounded-xl bg-red-950/40 text-red-400 hover:text-red-300 border border-red-800/40"
                  title="Delete review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-brand-silver italic leading-relaxed">
              &ldquo;{rev.text}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
