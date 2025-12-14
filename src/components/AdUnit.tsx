'use client';

import { useEffect } from 'react';

export function AdUnit({ slotId = "4872779616", className }: { slotId?: string; className?: string }) {
    useEffect(() => {
        // Safety check: Don't run on server
        if (typeof window === 'undefined') return;

        // Debounce to ensure layout is ready
        const timer = setTimeout(() => {
            try {
                // Check if ad is already loaded
                const adElement = document.querySelector(`ins[data-ad-slot="${slotId}"]`);
                if (adElement) {
                    // Prevent error: No slot size for availableWidth=0 (Hidden elements)
                    if (adElement.clientWidth === 0 || adElement.clientHeight === 0) {
                        return;
                    }

                    // Check if already filled to prevent duplicate requests
                    if (adElement.getAttribute('data-ad-status') === 'filled') {
                        return;
                    }

                    // Check if global adsbygoogle object exists
                    // @ts-ignore
                    if (window.adsbygoogle) {
                        // @ts-ignore
                        window.adsbygoogle.push({});
                    }
                }
            } catch (err) {
                // Suppress common ad errors in dev
                if (process.env.NODE_ENV !== 'production') {
                    console.debug('AdSense Silent Fail:', err);
                }
            }
        }, 200); // 200ms delay for layout stability

        return () => clearTimeout(timer);
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
