import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'UnitMaster - Premium Unit Converter & Calculators',
    template: '%s | UnitMaster',
  },
  description: 'The all-in-one digital toolkit. Professional financial calculators, unit converters, and PDF tools. Fast, free, and privacy-focused.',
  keywords: ['unit converter', 'financial calculator', 'mortgage calculator', 'pdf tools', 'image resize', 'currency converter'],
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
    google: '6S98Dxq3OVsax4x2LK6Ia8f5A64nYfJW79aPzcA5Itg',
    other: {
      'impact-site-verification': '1ce22c09-2796-4064-aa79-18e749c44bce',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background antialiased`}>
        <div className="fixed inset-0 -z-10 bg-mesh opacity-50 pointer-events-none" />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6595166353140049"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
