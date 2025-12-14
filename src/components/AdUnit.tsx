'use client';

import { useEffect } from 'react';

export function AdUnit({ slotId = "4872779616", className }: { slotId?: string; className?: string }) {
    useEffect(() => {
        try {
            // Check if ad is already loaded in this specific slot to prevent "All ins elements... already have ads" error
            const adElement = document.querySelector(`ins[data-ad-slot="${slotId}"]`);
            if (adElement && adElement.getAttribute('data-ad-status') === 'filled') {
                return;
            }

            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            // Ignore errors in dev
            if (process.env.NODE_ENV !== 'production') {
                console.debug('AdSense Info:', err);
            }
        }
    }, [slotId]);

    return (
        <div className={`w-full bg-secondary/30 border border-border/50 rounded-xl overflow-hidden flex flex-col items-center justify-center min-h-[100px] ${className}`}>
            <div className="w-full flex justify-center bg-secondary/50 py-1 border-b border-border/50">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Advertisement</span>
            </div>
            <div className="w-full">
                <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-6595166353140049"
                    data-ad-slot={slotId}
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                    {...(process.env.NODE_ENV === 'development' ? { 'data-adtest': 'on' } : {})}
                />
            </div>
        </div>
    );
}
