'use client';

import { useEffect } from 'react';

export function AdUnit({ slotId = "4872779616", className }: { slotId?: string; className?: string }) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense Error:', err);
        }
    }, []);

    return (
        <div className={`w-full bg-secondary/30 border border-border/50 rounded-xl overflow-hidden flex flex-col items-center justify-center min-h-[100px] ${className}`}>
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest font-semibold mb-1 self-start ml-2 mt-1">Advertisement</span>
            <div className="w-full">
                <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-6595166353140049"
                    data-ad-slot={slotId}
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        </div>
    );
}
