'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export function AdSenseLoader() {
    return (
        <Script
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6595166353140049"
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
