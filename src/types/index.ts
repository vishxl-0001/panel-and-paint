export type QuoteStatus = 'new' | 'contacted' | 'in_progress' | 'completed';

export interface QuoteRequest {
  id: string;
  name: string;
  phone: string;
  email?: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear?: string;
  serviceType: string;
  description: string;
  photoUrls: string[];
  status: QuoteStatus;
  notes?: string;
  estimatedCost?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewItem {
  id: string;
  authorName: string; // e.g. "Alison W."
  isLocalGuide?: boolean;
  rating: number; // 5
  text: string;
  date?: string; // Optional per requirements
  source: string; // "Google Reviews"
  isVisible: boolean;
  order: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  turnaroundTime: string;
  iconName: string;
  imageUrl: string;
  keyBenefits: string[];
  isFeatured: boolean;
  order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'Paint Work' | 'Panel & Dents' | 'Rust & WoF' | 'Bumpers & Detailing';
  imageUrl: string;
  caption: string;
  isRealWork?: boolean;
  order: number;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  vehicle: string;
  description: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  order: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface DaySchedule {
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  note?: string; // Clearly marked placeholder
}

export interface BusinessSettings {
  businessName: string;
  ownerPlaceholder: string; // [Owner name / Darren]
  phone: string;
  whatsapp: string;
  emailPlaceholder: string;
  address: string;
  googleRating: number; // 4.4
  reviewCount: number; // 7
  googleReviewsUrl: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  trustTurnaround: string;
  trustPricing: string;
  trustWorkmanship: string;
  announcement: {
    isEnabled: boolean;
    badge: string;
    text: string;
    linkUrl?: string;
    linkText?: string;
  };
  openingHours: Record<DayOfWeek, DaySchedule>;
  holidayNotice: string;
  appearance: {
    accentColor: string;
    theme: 'dark' | 'light';
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
}
