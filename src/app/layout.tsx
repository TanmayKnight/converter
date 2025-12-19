import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import Script from 'next/script';
import { PrivacyDashboard } from '@/components/PrivacyDashboard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'UnitMaster - Premium Unit Converter & Calculators',
    template: '%s | UnitMaster',
  },
  description: 'The all-in-one digital toolkit. Professional financial calculators, unit converters, and PDF tools. Fast, free, and privacy-focused.',
  keywords: [
    'unit converter', 'financial calculator', 'mortgage calculator', 'pdf tools', 'image resize', 'currency converter',
    'passport photo maker', 'video trimmer', 'pdf merger', 'qr code generator', 'json formatter', 'ohm\'s law calculator',
    'audio mixer', 'voice changer', 'remove background', 'pdf to word', 'audio extractor'
  ],
  authors: [{ name: 'UnitMaster Team' }],
  metadataBase: new URL('https://unitmaster.io'),
  openGraph: {
    title: 'UnitMaster',
    description: 'The all-in-one digital toolkit for professionals.',
    url: 'https://unitmaster.io',
    siteName: 'UnitMaster',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UnitMaster',
    description: 'Calculators, Converters, and Tools for everyone.',
    creator: '@unitmaster',
  },
  verification: {
    google: 'bjpEfNzGpb13ry19KxJAobdZBxyUuMaTil95SQG-GS8',
    other: {
      'impact-site-verification': '1ce22c09-2796-4064-aa79-18e749c44bce',
      'google-adsense-account': 'ca-pub-6595166353140049',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'UnitMaster',
  },
};

export const viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background antialiased`} suppressHydrationWarning>
        <div className="fixed inset-0 -z-10 bg-mesh opacity-50 pointer-events-none" />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        <Toaster />
        <PrivacyDashboard />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6595166353140049"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'UnitMaster',
              url: 'https://unitmaster.io',
              logo: 'https://unitmaster.io/logo.png',
              image: 'https://unitmaster.io/opengraph-image.png',
              sameAs: [
                'https://twitter.com/unitmaster'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'tableaulancer@gmail.com',
                contactType: 'customer support'
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'UnitMaster',
              applicationCategory: 'UtilitiesApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
