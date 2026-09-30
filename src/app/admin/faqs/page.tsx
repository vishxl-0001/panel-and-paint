'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { HelpCircle, Plus, Edit2, Trash2, X, Save } from 'lucide-react';

export default function FaqsManagerPage() {
  const { faqs, addFaq, updateFaq, deleteFaq } = useContent();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('General');

  const handleStartAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setQuestion('');
    setAnswer('');
    setCategory('General');
  };

  const handleStartEdit = (faq: (typeof faqs)[0]) => {
    setEditingId(faq.id);
    setIsAdding(false);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;
    if (isAdding) {
      addFaq({ question, answer, category });
      setIsAdding(false);
    } else if (editingId) {
      updateFaq(editingId, { question, answer, category });
      setEditingId(null);
    }
    setQuestion('');
    setAnswer('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-2.5">
            <HelpCircle className="w-7 h-7 text-brand-accent" />
            <span>FAQ Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Manage frequently asked questions regarding turnaround times, WoF rust repairs, and insurance.
          </p>
        </div>

        {!isAdding && !editingId && (
          <button
            onClick={handleStartAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-glow-red transition-all self-start sm:self-auto min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New FAQ</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {(isAdding || editingId) && (
        <form
          onSubmit={handleSave}
          className="bg-brand-card border border-brand-accent/50 rounded-3xl p-6 sm:p-8 shadow-glass space-y-4"
        >
          <div className="flex items-center justify-between border-b border-brand-border pb-4">
            <h2 className="text-lg font-bold text-white">
              {isAdding ? 'Add New Question' : 'Edit Question'}
            </h2>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
              }}
              className="p-1 rounded-lg text-brand-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Question *
            </label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Can you repair chassis rust for Warrant of Fitness?"
              className="w-full px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Answer *
            </label>
            <textarea
              rows={3}
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Detailed answer provided to customers"
              className="w-full p-4 rounded-xl bg-brand-dark border border-brand-border text-sm text-white leading-relaxed focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-accent hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-glow-red"
            >
              Save Question
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-xs sm:text-sm text-brand-silver"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* FAQs List */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="p-5 rounded-2xl bg-brand-card border border-brand-border flex items-start justify-between gap-4"
          >
            <div>
              <h3 className="font-bold text-base text-white">{faq.question}</h3>
              <p className="text-xs sm:text-sm text-brand-muted mt-2 leading-relaxed">
                {faq.answer}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleStartEdit(faq)}
                className="p-2 rounded-lg bg-brand-dark hover:bg-brand-cardHover border border-brand-border text-brand-silver hover:text-white"
                title="Edit FAQ"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm('Delete this question?')) {
                    deleteFaq(faq.id);
                  }
                }}
                className="p-2 rounded-lg bg-red-950/40 border border-red-800/40 text-red-400 hover:text-red-300"
                title="Delete FAQ"
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
