import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import Script from 'next/script';
import { PrivacyDashboard } from '@/components/PrivacyDashboard';
import { AdSenseLoader } from '@/components/AdSenseLoader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://unitmaster.io'),
  title: {
    default: 'UnitMaster - Offline, Privacy-First Developer Tools (WASM)',
    template: '%s | UnitMaster - Offline Developer Tools',
  },
  description: 'The secure, offline-first developer toolkit. Parse JSON, debug JWTs, merge PDFs, and convert units locally using WebAssembly. No server logs or file uploads.',
  keywords: [
    'offline unit converter', 'wasm pdf tools', 'local developer tools', 'secure json formatter',
    'jwt debugger offline', 'privacy first calculator', 'client side processing', 'no sermon logs',
    'pdf merge local', 'base64 converter offline', 'developer utilities', 'typescript tools'
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'UnitMaster',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.png', // Assuming icon.png can be used as apple touch icon or add a specific one if available
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
        <AdSenseLoader />
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
