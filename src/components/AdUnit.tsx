export function AdUnit({ slotId, className }: { slotId?: string; className?: string }) {
    // In a real app, this would integrate with Google AdSense
    // For now, it renders a placeholder in development, or nothing if not configured
    // User can plug in their client ID later

    return (
        <div className={`w-full bg-secondary/30 border border-border/50 rounded-xl overflow-hidden flex items-center justify-center min-h-[100px] ${className}`}>
            <div className="text-center p-4">
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Advertisement</span>
                {/* 
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXX"
                crossOrigin="anonymous"
            />
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXX"
                data-ad-slot={slotId}
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
            */}
            </div>
        </div>
    );
}
