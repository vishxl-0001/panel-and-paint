'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  BusinessSettings,
  ServiceItem,
  ReviewItem,
  GalleryItem,
  BeforeAfterItem,
  FaqItem,
  QuoteRequest,
  QuoteStatus,
} from '@/types';
import {
  INITIAL_SETTINGS,
  INITIAL_SERVICES,
  INITIAL_REVIEWS,
  INITIAL_GALLERY,
  INITIAL_BEFORE_AFTER,
  INITIAL_FAQS,
  INITIAL_QUOTES,
} from '@/lib/store';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface ContentContextType {
  settings: BusinessSettings;
  services: ServiceItem[];
  reviews: ReviewItem[];
  gallery: GalleryItem[];
  beforeAfter: BeforeAfterItem[];
  faqs: FaqItem[];
  quotes: QuoteRequest[];
  isLoaded: boolean;
  updateSettings: (newSettings: Partial<BusinessSettings>) => void;
  // Quotes
  addQuote: (quote: Omit<QuoteRequest, 'id' | 'createdAt' | 'updatedAt'>) => Promise<{ success: boolean; id: string }>;
  updateQuoteStatus: (id: string, status: QuoteStatus) => void;
  addQuoteNote: (id: string, note: string) => void;
  deleteQuote: (id: string) => void;
  // Services
  addService: (service: Omit<ServiceItem, 'id' | 'order'>) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  // Reviews
  addReview: (review: Omit<ReviewItem, 'id' | 'order'>) => void;
  updateReview: (id: string, updated: Partial<ReviewItem>) => void;
  toggleReviewVisibility: (id: string) => void;
  deleteReview: (id: string) => void;
  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'order'>) => void;
  deleteGalleryItem: (id: string) => void;
  // Before / After
  addBeforeAfter: (item: Omit<BeforeAfterItem, 'id' | 'order'>) => void;
  updateBeforeAfter: (id: string, updated: Partial<BeforeAfterItem>) => void;
  deleteBeforeAfter: (id: string) => void;
  // FAQs
  addFaq: (faq: Omit<FaqItem, 'id' | 'order'>) => void;
  updateFaq: (id: string, updated: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
  // Reset
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'npp_settings_v1',
  SERVICES: 'npp_services_v1',
  REVIEWS: 'npp_reviews_v1',
  GALLERY: 'npp_gallery_v1',
  BEFORE_AFTER: 'npp_before_after_v1',
  FAQS: 'npp_faqs_v1',
  QUOTES: 'npp_quotes_v1',
};

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<BusinessSettings>(INITIAL_SETTINGS);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [beforeAfter, setBeforeAfter] = useState<BeforeAfterItem[]>(INITIAL_BEFORE_AFTER);
  const [faqs, setFaqs] = useState<FaqItem[]>(INITIAL_FAQS);
  const [quotes, setQuotes] = useState<QuoteRequest[]>(INITIAL_QUOTES);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage or Supabase on mount
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) setSettings(JSON.parse(storedSettings));

      const storedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (storedServices) setServices(JSON.parse(storedServices));

      const storedReviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (storedReviews) setReviews(JSON.parse(storedReviews));

      const storedGallery = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (storedGallery) setGallery(JSON.parse(storedGallery));

      const storedBA = localStorage.getItem(STORAGE_KEYS.BEFORE_AFTER);
      if (storedBA) setBeforeAfter(JSON.parse(storedBA));

      const storedFaqs = localStorage.getItem(STORAGE_KEYS.FAQS);
      if (storedFaqs) setFaqs(JSON.parse(storedFaqs));

      const storedQuotes = localStorage.getItem(STORAGE_KEYS.QUOTES);
      if (storedQuotes) setQuotes(JSON.parse(storedQuotes));
    } catch (err) {
      console.warn('Could not read from localStorage, using initial store', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateSettings = (newSettings: Partial<BusinessSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      return updated;
    });
  };

  const addQuote = async (quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: `qt-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setQuotes((prev) => {
      const updated = [newQuote, ...prev];
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updated));
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('quotes').insert([
          {
            name: newQuote.name,
            phone: newQuote.phone,
            email: newQuote.email,
            vehicle_make: newQuote.vehicleMake,
            vehicle_model: newQuote.vehicleModel,
            vehicle_year: newQuote.vehicleYear,
            service_type: newQuote.serviceType,
            description: newQuote.description,
            photo_urls: newQuote.photoUrls,
            status: newQuote.status,
          },
        ]);
      } catch (e) {
        console.error('Supabase quote sync error:', e);
      }
    }

    return { success: true, id: newQuote.id };
  };

  const updateQuoteStatus = (id: string, status: QuoteStatus) => {
    setQuotes((prev) => {
      const updated = prev.map((q) => (q.id === id ? { ...q, status, updatedAt: new Date().toISOString() } : q));
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updated));
      return updated;
    });
  };

  const addQuoteNote = (id: string, notes: string) => {
    setQuotes((prev) => {
      const updated = prev.map((q) => (q.id === id ? { ...q, notes, updatedAt: new Date().toISOString() } : q));
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteQuote = (id: string) => {
    setQuotes((prev) => {
      const updated = prev.filter((q) => q.id !== id);
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updated));
      return updated;
    });
  };

  const addService = (item: Omit<ServiceItem, 'id' | 'order'>) => {
    setServices((prev) => {
      const newService: ServiceItem = {
        ...item,
        id: `srv-${Date.now()}`,
        order: prev.length + 1,
      };
      const updated = [...prev, newService];
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
      return updated;
    });
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices((prev) => {
      const list = prev.map((s) => (s.id === id ? { ...s, ...updated } : s));
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(list));
      return list;
    });
  };

  const deleteService = (id: string) => {
    setServices((prev) => {
      const list = prev.filter((s) => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(list));
      return list;
    });
  };

  const addReview = (review: Omit<ReviewItem, 'id' | 'order'>) => {
    setReviews((prev) => {
      const newReview: ReviewItem = {
        ...review,
        id: `rev-${Date.now()}`,
        order: prev.length + 1,
      };
      const updated = [...prev, newReview];
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateReview = (id: string, updated: Partial<ReviewItem>) => {
    setReviews((prev) => {
      const list = prev.map((r) => (r.id === id ? { ...r, ...updated } : r));
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(list));
      return list;
    });
  };

  const toggleReviewVisibility = (id: string) => {
    setReviews((prev) => {
      const list = prev.map((r) => (r.id === id ? { ...r, isVisible: !r.isVisible } : r));
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(list));
      return list;
    });
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => {
      const list = prev.filter((r) => r.id !== id);
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(list));
      return list;
    });
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id' | 'order'>) => {
    setGallery((prev) => {
      const newItem: GalleryItem = {
        ...item,
        id: `gal-${Date.now()}`,
        order: prev.length + 1,
      };
      const updated = [newItem, ...prev];
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => {
      const list = prev.filter((g) => g.id !== id);
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(list));
      return list;
    });
  };

  const addBeforeAfter = (item: Omit<BeforeAfterItem, 'id' | 'order'>) => {
    setBeforeAfter((prev) => {
      const newItem: BeforeAfterItem = {
        ...item,
        id: `ba-${Date.now()}`,
        order: prev.length + 1,
      };
      const updated = [...prev, newItem];
      localStorage.setItem(STORAGE_KEYS.BEFORE_AFTER, JSON.stringify(updated));
      return updated;
    });
  };

  const updateBeforeAfter = (id: string, updated: Partial<BeforeAfterItem>) => {
    setBeforeAfter((prev) => {
      const list = prev.map((b) => (b.id === id ? { ...b, ...updated } : b));
      localStorage.setItem(STORAGE_KEYS.BEFORE_AFTER, JSON.stringify(list));
      return list;
    });
  };

  const deleteBeforeAfter = (id: string) => {
    setBeforeAfter((prev) => {
      const list = prev.filter((b) => b.id !== id);
      localStorage.setItem(STORAGE_KEYS.BEFORE_AFTER, JSON.stringify(list));
      return list;
    });
  };

  const addFaq = (faq: Omit<FaqItem, 'id' | 'order'>) => {
    setFaqs((prev) => {
      const newItem: FaqItem = {
        ...faq,
        id: `faq-${Date.now()}`,
        order: prev.length + 1,
      };
      const updated = [...prev, newItem];
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateFaq = (id: string, updated: Partial<FaqItem>) => {
    setFaqs((prev) => {
      const list = prev.map((f) => (f.id === id ? { ...f, ...updated } : f));
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(list));
      return list;
    });
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => {
      const list = prev.filter((f) => f.id !== id);
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(list));
      return list;
    });
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.BEFORE_AFTER);
    localStorage.removeItem(STORAGE_KEYS.FAQS);
    setSettings(INITIAL_SETTINGS);
    setServices(INITIAL_SERVICES);
    setReviews(INITIAL_REVIEWS);
    setGallery(INITIAL_GALLERY);
    setBeforeAfter(INITIAL_BEFORE_AFTER);
    setFaqs(INITIAL_FAQS);
  };

  return (
    <ContentContext.Provider
      value={{
        settings,
        services,
        reviews,
        gallery,
        beforeAfter,
        faqs,
        quotes,
        isLoaded,
        updateSettings,
        addQuote,
        updateQuoteStatus,
        addQuoteNote,
        deleteQuote,
        addService,
        updateService,
        deleteService,
        addReview,
        updateReview,
        toggleReviewVisibility,
        deleteReview,
        addGalleryItem,
        deleteGalleryItem,
        addBeforeAfter,
        updateBeforeAfter,
        deleteBeforeAfter,
        addFaq,
        updateFaq,
        deleteFaq,
        resetToDefaults,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
