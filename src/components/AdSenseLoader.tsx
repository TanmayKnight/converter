'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export function AdSenseLoader() {
    const [loadAds, setLoadAds] = useState(false);

    useEffect(() => {
        const handleInteraction = () => {
            setLoadAds(true);
        };

        // Delay loading until user interacts (scroll, click, touch) or after 4 seconds
        window.addEventListener('scroll', handleInteraction, { once: true });
        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });

        // Fallback: Load after 4 seconds if no interaction (to ensure visibility)
        const timer = setTimeout(() => {
            setLoadAds(true);
        }, 4000);

        return () => {
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            clearTimeout(timer);
        };
    }, []);

    if (!loadAds) return null;

    return (
        <Script
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6595166353140049"
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
