'use client';

import { Shield, Wifi, WifiOff, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { NetworkMonitor } from '@/components/common/NetworkMonitor';

export function PrivacyShield() {
    const [isChecking, setIsChecking] = useState(true);
    const [showLog, setShowLog] = useState(false);

    useEffect(() => {
        // Simulate a "network check" for effect
        const timer = setTimeout(() => {
            setIsChecking(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="p-8">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                    <Shield className="h-24 w-24 text-primary/5 -rotate-12" />
                </div>

                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 relative z-10">
                    <Shield className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold mb-3 relative z-10">100% Private & Secure</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                    Your files never leave your device. Processing happens locally in your browser sandbox.
                </p>

                <div className={`flex items-center gap-3 text-sm font-medium px-4 py-2 rounded-lg transition-colors relative z-10 ${isChecking ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' : 'bg-green-500/10 text-green-600 dark:text-green-400'
                    }`}>
                    <div className="relative">
                        <div className={`h-2.5 w-2.5 rounded-full ${isChecking ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                        {!isChecking && <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-green-500 animate-ping opacity-75" />}
                    </div>

                    {isChecking ? (
                        <span className="flex items-center gap-2">
                            <Wifi className="h-4 w-4" /> Checking Network...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <WifiOff className="h-4 w-4" /> Network Idle: Local Mode
                        </span>
                    )}
                </div>

                {!isChecking && (
                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-xs text-muted-foreground ml-1 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                            <CheckCircle2 className="h-3 w-3" /> No active uploads
                        </div>
                        <button
                            onClick={() => setShowLog(!showLog)}
                            className="text-xs flex items-center gap-1 text-primary hover:underline font-medium z-10"
                        >
                            {showLog ? 'Hide Network Log' : 'View Live Traffic'}
                            {showLog ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>
                    </div>
                )}
            </div>

            {/* Live Monitor Section */}
            {showLog && (
                <div className="border-t border-border animate-in slide-in-from-top-2">
                    <NetworkMonitor />
                </div>
            )}
        </div>
    );
}
