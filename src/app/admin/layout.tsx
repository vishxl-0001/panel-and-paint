'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContent } from '@/context/ContentContext';
import {
  LayoutDashboard,
  Inbox,
  FileEdit,
  Wrench,
  Image as ImageIcon,
  SlidersHorizontal,
  Star,
  HelpCircle,
  Settings,
  ExternalLink,
  LogOut,
  Shield,
  Menu,
  X,
  Bell,
  CheckCircle,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { quotes, settings } = useContent();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // New quotes count
  const newQuotesCount = quotes.filter((q) => q.status === 'new').length;

  useEffect(() => {
    // Check if user is logged in
    const authStatus = localStorage.getItem('npp_admin_auth');
    if (authStatus === 'true' || pathname === '/admin/login') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('npp_admin_auth');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Quotes Inbox', href: '/admin/quotes', icon: Inbox, badge: newQuotesCount > 0 ? newQuotesCount : null },
    { label: 'Site Content', href: '/admin/content', icon: FileEdit },
    { label: 'Services', href: '/admin/services', icon: Wrench },
    { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { label: 'Before / After', href: '/admin/before-after', icon: SlidersHorizontal },
    { label: 'Google Reviews', href: '/admin/reviews', icon: Star },
    { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    { label: 'Business Settings', href: '/admin/settings', icon: Settings },
  ];

  // If on login page, render children cleanly
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-brand-dark">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col md:flex-row pb-20 md:pb-0">
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex flex-col w-64 bg-brand-card border-r border-brand-border shrink-0 select-none">
        {/* Admin Brand Header */}
        <div className="p-5 border-b border-brand-border/60">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-accent to-brand-accentOrange flex items-center justify-center text-white font-bold text-sm">
              NP
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">Admin Portal</h2>
              <p className="text-[10px] text-brand-muted truncate max-w-[150px]">
                {settings.businessName}
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-accent text-white shadow-glow-red'
                    : 'text-brand-silver hover:bg-brand-dark hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-brand-accent' : 'bg-brand-accent text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-brand-border/60 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-brand-dark hover:bg-brand-cardHover border border-brand-border text-xs font-medium text-brand-silver hover:text-white transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- MOBILE TOP HEADER --- */}
      <header className="md:hidden sticky top-0 z-40 bg-brand-card/95 backdrop-blur-md border-b border-brand-border px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-accent flex items-center justify-center text-white font-bold text-xs">
            NP
          </div>
          <span className="font-bold text-sm text-white">Owner Portal</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/quotes"
            className="relative p-2 rounded-lg bg-brand-dark border border-brand-border text-brand-silver"
          >
            <Bell className="w-4 h-4" />
            {newQuotesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-accent text-white text-[10px] font-bold flex items-center justify-center">
                {newQuotesCount}
              </span>
            )}
          </Link>

          <Link
            href="/"
            target="_blank"
            className="p-2 rounded-lg bg-brand-dark border border-brand-border text-brand-silver"
            title="View Live Site"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-red-950/50 border border-red-800/40 text-red-400"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* --- MAIN ADMIN CONTENT VIEW --- */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>

      {/* --- MOBILE BOTTOM TAB NAVIGATION (Critical for phone usability) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-card/98 backdrop-blur-xl border-t border-brand-border px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-around">
        <Link
          href="/admin"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg min-w-[50px] min-h-[44px] ${
            pathname === '/admin' ? 'text-brand-accent font-bold' : 'text-brand-muted'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Overview</span>
        </Link>

        <Link
          href="/admin/quotes"
          className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-lg min-w-[50px] min-h-[44px] ${
            pathname === '/admin/quotes' ? 'text-brand-accent font-bold' : 'text-brand-muted'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Quotes</span>
          {newQuotesCount > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-brand-accent" />
          )}
        </Link>

        <Link
          href="/admin/content"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg min-w-[50px] min-h-[44px] ${
            pathname === '/admin/content' ? 'text-brand-accent font-bold' : 'text-brand-muted'
          }`}
        >
          <FileEdit className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Content</span>
        </Link>

        <Link
          href="/admin/services"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg min-w-[50px] min-h-[44px] ${
            pathname === '/admin/services' ? 'text-brand-accent font-bold' : 'text-brand-muted'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Services</span>
        </Link>

        <Link
          href="/admin/settings"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg min-w-[50px] min-h-[44px] ${
            pathname === '/admin/settings' ? 'text-brand-accent font-bold' : 'text-brand-muted'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Settings</span>
        </Link>
      </nav>
    </div>
  );
}
