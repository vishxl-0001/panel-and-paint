'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error: authErr } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authErr) {
          setError(authErr.message);
          setLoading(false);
          return;
        }
      } catch (err: any) {
        setError(err.message || 'Authentication failed');
        setLoading(false);
        return;
      }
    }

    // Success or local mode fallback
    localStorage.setItem('npp_admin_auth', 'true');
    router.push('/admin');
  };

  const handleDemoLogin = () => {
    localStorage.setItem('npp_admin_auth', 'true');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-accentOrange flex items-center justify-center text-white mx-auto shadow-glow-red">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white">Owner Portal</h1>
          <p className="text-xs text-brand-muted">
            Ngongotaha Panel & Paint • Workshop Admin
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800/50 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@ngongotahapanelpaint.co.nz"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-sm text-white focus:outline-none focus:border-brand-accent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[48px] py-3 rounded-xl bg-gradient-to-r from-brand-accent to-red-600 hover:from-red-600 hover:to-brand-accent text-white font-bold text-sm shadow-glow-red hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In to Admin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Demo Access for Evaluation */}
        <div className="pt-4 border-t border-brand-border/60 text-center space-y-3">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-brand-dark hover:bg-brand-cardHover border border-brand-border text-xs font-bold text-brand-silver hover:text-white flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>1-Click Owner Demo Access (No password required)</span>
          </button>

          <Link href="/" className="block text-xs text-brand-muted hover:text-white transition-colors">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
