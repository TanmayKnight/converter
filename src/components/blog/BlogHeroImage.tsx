'use client';

import { useState } from 'react';
import Image from 'next/image';

interface BlogHeroImageProps {
    src: string;
    alt: string;
}

export function BlogHeroImage({ src, alt }: BlogHeroImageProps) {
    const [error, setError] = useState(false);

    if (error) {
        return (
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center text-white/20 font-bold text-4xl">
                Blog
            </div>
        );
    }

    return (
        <div className="aspect-video w-full rounded-2xl shadow-2xl border border-border/50 overflow-hidden bg-muted relative">
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                onError={() => setError(true)}
            />
        </div>
    );
}
