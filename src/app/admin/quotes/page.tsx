'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { QuoteStatus, QuoteRequest } from '@/types';
import { getTelUrl, getWhatsAppUrl } from '@/lib/utils';
import {
  Inbox,
  Search,
  Filter,
  Download,
  Phone,
  MessageSquare,
  Mail,
  Trash2,
  Calendar,
  Car,
  Image as ImageIcon,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
} from 'lucide-react';

export default function QuotesInboxPage() {
  const { quotes, updateQuoteStatus, addQuoteNote, deleteQuote } = useContent();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(quotes[0] || null);
  const [noteInput, setNoteInput] = useState<string>('');

  // Filtering
  const filteredQuotes = quotes.filter((q) => {
    const matchesStatus = filterStatus === 'all' ? true : q.status === filterStatus;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      q.name.toLowerCase().includes(query) ||
      q.vehicleMake.toLowerCase().includes(query) ||
      q.vehicleModel.toLowerCase().includes(query) ||
      q.phone.includes(query);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: QuoteStatus) => {
    updateQuoteStatus(id, newStatus);
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleSaveNote = () => {
    if (!selectedQuote || !noteInput.trim()) return;
    addQuoteNote(selectedQuote.id, noteInput);
    setSelectedQuote((prev) => (prev ? { ...prev, notes: noteInput } : null));
    setNoteInput('');
  };

  // CSV Export
  const exportToCSV = () => {
    const headers = ['ID', 'Date', 'Customer Name', 'Phone', 'Email', 'Vehicle Make', 'Model', 'Year', 'Service', 'Status', 'Notes'];
    const rows = filteredQuotes.map((q) => [
      q.id,
      new Date(q.createdAt).toLocaleDateString(),
      `"${q.name}"`,
      `"${q.phone}"`,
      `"${q.email || ''}"`,
      `"${q.vehicleMake}"`,
      `"${q.vehicleModel}"`,
      `"${q.vehicleYear || ''}"`,
      `"${q.serviceType}"`,
      q.status,
      `"${(q.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ngongotaha_quotes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-2.5">
            <Inbox className="w-7 h-7 text-brand-accent" />
            <span>Quotes Inbox</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Review customer quote requests, damage photos, update statuses, and log repair notes.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-card hover:bg-brand-cardHover border border-brand-border text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors self-start sm:self-auto min-h-[44px]"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, phone, or vehicle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-brand-dark border border-brand-border text-xs sm:text-sm text-white placeholder-brand-muted focus:outline-none focus:border-brand-accent"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'new', 'contacted', 'in_progress', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors min-h-[38px] ${
                filterStatus === st
                  ? 'bg-brand-accent text-white'
                  : 'bg-brand-dark text-brand-muted hover:text-white border border-brand-border'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Grid (List on left, Detail on right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Quote Items List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredQuotes.length === 0 ? (
            <div className="bg-brand-card border border-brand-border rounded-2xl p-8 text-center text-sm text-brand-muted">
              No quotes match your current filter.
            </div>
          ) : (
            filteredQuotes.map((q) => {
              const isSelected = selectedQuote?.id === q.id;
              return (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuote(q)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-card border-brand-accent shadow-glow-red/20'
                      : 'bg-brand-card/70 hover:bg-brand-card border-brand-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-white">{q.name}</span>
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

                  <p className="text-xs text-brand-silver font-medium flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-brand-accent" />
                    <span>{q.vehicleMake} {q.vehicleModel}</span>
                    {q.vehicleYear && <span className="text-brand-muted">({q.vehicleYear})</span>}
                  </p>

                  <p className="text-xs text-brand-muted mt-1.5 line-clamp-2 leading-relaxed">
                    {q.description}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-brand-border/40 text-[11px] text-brand-muted">
                    <span>{q.serviceType}</span>
                    <span>{new Date(q.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Quote Detail Pane */}
        <div className="lg:col-span-7">
          {selectedQuote ? (
            <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-glass space-y-6">
              
              {/* Header with Status Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/60 pb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted">
                    Request ID: {selectedQuote.id}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    {selectedQuote.name}
                  </h2>
                  <p className="text-xs text-brand-muted">
                    Submitted on {new Date(selectedQuote.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-brand-muted font-medium">Status:</span>
                  <select
                    value={selectedQuote.status}
                    onChange={(e) => handleStatusChange(selectedQuote.id, e.target.value as QuoteStatus)}
                    className="px-3 py-1.5 rounded-xl bg-brand-dark border border-brand-border text-xs font-bold text-white focus:outline-none focus:border-brand-accent cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* 1-Tap Customer Contact Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={getTelUrl(selectedQuote.phone)}
                  className="py-3 px-4 rounded-xl bg-brand-dark hover:bg-brand-cardHover border border-brand-border text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-brand-accent" />
                  <span>Call {selectedQuote.phone}</span>
                </a>

                <a
                  href={getWhatsAppUrl(selectedQuote.phone, `Hi ${selectedQuote.name}, Darren from Ngongotaha Panel & Paint here regarding your ${selectedQuote.vehicleMake} ${selectedQuote.vehicleModel}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>

              {/* Vehicle & Service Info */}
              <div className="grid grid-cols-2 gap-4 bg-brand-dark/60 p-4 rounded-2xl border border-brand-border/60 text-xs">
                <div>
                  <span className="text-brand-muted block mb-0.5">Vehicle</span>
                  <span className="font-bold text-white text-sm">
                    {selectedQuote.vehicleMake} {selectedQuote.vehicleModel} {selectedQuote.vehicleYear || ''}
                  </span>
                </div>
                <div>
                  <span className="text-brand-muted block mb-0.5">Service Requested</span>
                  <span className="font-bold text-white text-sm">
                    {selectedQuote.serviceType}
                  </span>
                </div>
              </div>

              {/* Customer's Damage Description */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-2">
                  Customer Description
                </h3>
                <div className="p-4 rounded-2xl bg-brand-dark/80 border border-brand-border text-sm text-brand-silver leading-relaxed whitespace-pre-wrap">
                  {selectedQuote.description}
                </div>
              </div>

              {/* Photos Gallery */}
              {selectedQuote.photoUrls && selectedQuote.photoUrls.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-3 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Damage Photos ({selectedQuote.photoUrls.length})</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedQuote.photoUrls.map((url, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative h-28 rounded-xl overflow-hidden border border-brand-border group block"
                      >
                        <img src={url} alt={`Damage photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <span className="absolute bottom-1 right-1 text-[9px] bg-black/70 text-white px-1.5 py-0.5 rounded">
                          Tap to enlarge
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Internal Workshop Notes */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-2">
                  Internal Shop Notes
                </h3>
                {selectedQuote.notes && (
                  <div className="p-3 mb-3 rounded-xl bg-brand-dark border border-brand-border text-xs text-amber-300">
                    <span className="font-semibold text-white">Current Note:</span> {selectedQuote.notes}
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a note (e.g. Quoted $450, customer dropping car next Tuesday)..."
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl bg-brand-dark border border-brand-border text-xs text-white focus:outline-none focus:border-brand-accent"
                  />
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-2 rounded-xl bg-brand-accent hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Delete Action */}
              <div className="pt-4 border-t border-brand-border/60 flex justify-end">
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this quote request?')) {
                      deleteQuote(selectedQuote.id);
                      setSelectedQuote(null);
                    }
                  }}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 p-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Quote</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-brand-card border border-brand-border rounded-3xl p-12 text-center text-sm text-brand-muted">
              Select a quote from the left to view full vehicle details, photos, and contact options.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
