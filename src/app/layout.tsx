import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UnitMaster - Premium Unit Converter',
  description: 'Fast, accurate, and beautiful unit converter for all your needs.',
  metadataBase: new URL('https://unitmaster.io'),
  verification: {
    google: '6S98Dxq3OVsax4x2LK6Ia8f5A64nYfJW79aPzcA5Itg',
    other: {
      'impact-site-verification': '1ce22c09-2796-4064-aa79-18e749c44bce',
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
