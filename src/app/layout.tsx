import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { ContentProvider } from '@/context/ContentContext';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { FloatingActions } from '@/components/ui/FloatingActions';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#080B11',
  viewportFit: 'cover', // Respect safe-area-inset-* on iOS notch devices
};

export const metadata: Metadata = {
  title: 'Ngongotaha Panel & Paint | Rotorua Panel Beater & Spray Painting',
  description:
    'Rotorua auto body shop for panel beating, spray painting, chassis rust repair, and bumper fixes. 4.4 Google rating. Same-day & next-day turnaround. 142 Oturoa Road, Ngongotahā.',
  keywords: [
    'panel beater Rotorua',
    'auto paint Rotorua',
    'rust repair Ngongotaha',
    'dent repair Rotorua',
    'chassis rust WoF Rotorua',
    'spray painting Ngongotaha',
    'bumper repair Rotorua',
  ],
  authors: [{ name: 'Ngongotaha Panel & Paint' }],
  metadataBase: new URL('https://ngongotahapanelpaint.co.nz'),
  openGraph: {
    title: 'Ngongotaha Panel & Paint | Precision Auto Body Repair & Spray Painting',
    description:
      'Flawless panel beating, rust repairs, and gloss spray painting in Rotorua. 4.4 Google rating based on real customer feedback. Fast turnaround.',
    url: 'https://ngongotahapanelpaint.co.nz',
    siteName: 'Ngongotaha Panel & Paint',
    images: [
      {
        url: '/images/ute-paint-booth.png',
        width: 1200,
        height: 630,
        alt: 'Ngongotaha Panel & Paint - Custom Spray Booth Finish',
      },
    ],
    locale: 'en_NZ',
    type: 'website',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/images/interior-detail.png',
    apple: '/images/interior-detail.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoBodyShop',
    name: 'Ngongotaha Panel & Paint',
    image: 'https://ngongotahapanelpaint.co.nz/images/ute-paint-booth.png',
    telephone: '+64 27 684 1468',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '142 Oturoa Road',
      addressLocality: 'Ngongotahā',
      addressRegion: 'Rotorua',
      postalCode: '3072',
      addressCountry: 'NZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -38.0827282,
      longitude: 176.1953935,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.4',
      reviewCount: '7',
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '$$',
    areaServed: ['Rotorua', 'Ngongotahā', 'Mamaku', 'Kaharoa', 'Hamurana'],
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Panel Beating & Chassis Alignment' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Spray Painting & Paint Finishes' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rust Repair & WoF Compliance' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dent & Ding Removal' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bumper Repair & Emergency Fixes' } },
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-brand-dark text-slate-100 min-h-screen flex flex-col selection:bg-brand-accent selection:text-white antialiased">
        <ThemeProvider>
          <ContentProvider>
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <FloatingActions />
          </ContentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
