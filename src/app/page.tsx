'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { GallerySection } from '@/components/sections/GallerySection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { QuoteFormSection } from '@/components/sections/QuoteFormSection';
import { InsuranceFaqSection } from '@/components/sections/InsuranceFaqSection';
import { ContactLocationSection } from '@/components/sections/ContactLocationSection';

export default function HomePage() {
  const [selectedQuoteService, setSelectedQuoteService] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero with Interactive 3D Car & Paint Color Switcher */}
      <HeroSection />

      {/* 2. Trust Bar (Rating, Turnaround, Pricing) */}
      <TrustBar />

      {/* 3. Confirmed Workshop Services with Detail Modal */}
      <ServicesSection onSelectServiceForQuote={(srv) => setSelectedQuoteService(srv)} />

      {/* 4. Interactive Before / After Comparison Slider */}
      <BeforeAfterSection />

      {/* 5. 4-Step Process Timeline */}
      <ProcessTimeline />

      {/* 6. Filterable Gallery with Lightbox (featuring real workshop photos) */}
      <GallerySection />

      {/* 7. Verified Google Reviews Carousel */}
      <ReviewsSection />

      {/* 8. Online Quote Request Form with Photo Previews */}
      <QuoteFormSection preselectedService={selectedQuoteService} />

      {/* 9. Insurance Information & Editable FAQ Accordion */}
      <InsuranceFaqSection />

      {/* 10. Contact Details, Live Open/Closed Hours & Google Maps Embed */}
      <ContactLocationSection />
    </div>
  );
}
