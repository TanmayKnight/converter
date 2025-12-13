'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Globe, EyeOff, X, ChevronRight } from 'lucide-react';

export function PrivacyDashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [isIncognito, setIsIncognito] = useState(false);

    // Mock "Network Activity" monitor
    const [requests, setRequests] = useState([
        { id: 1, name: 'Google Analytics', status: 'Allowed', type: 'Analytics' },
        { id: 2, name: 'AdSense', status: 'Allowed', type: 'Ads' },
        { id: 3, name: 'Conversion Logic', status: 'Local (Offline)', type: 'Core' },
    ]);

    useEffect(() => {
        if (isIncognito) {
            setRequests(prev => prev.map(r =>
                r.type !== 'Core' ? { ...r, status: 'Blocked' } : r
            ));
        } else {
            setRequests(prev => prev.map(r =>
                r.type !== 'Core' ? { ...r, status: 'Allowed' } : r
            ));
        }
    }, [isIncognito]);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-24 right-4 z-40 flex items-center gap-2 p-3 bg-card/80 backdrop-blur-md border border-green-500/30 rounded-full shadow-lg hover:shadow-green-500/20 transition-all hover:scale-105 group"
            >
                <div className="relative">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <span className="text-xs font-medium text-foreground pr-1 group-hover:block hidden animate-in slide-in-from-right-2">
                    Privacy Active
                </span>
            </button>
        );
    }

    return (
        <div className="fixed top-24 right-4 z-40 w-80 bg-card rounded-2xl shadow-2xl border border-border animate-in slide-in-from-right-5 fade-in duration-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold text-sm">Privacy Dashboard</h3>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-secondary rounded-full transition-colors"
                >
                    <X className="h-4 w-4 text-muted-foreground" />
                </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">

                {/* Status Card */}
                <div className="p-3 bg-secondary/30 rounded-xl border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-primary" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Processing Mode
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Client-Side (WASM)</span>
                        <span className="text-xs px-2 py-1 bg-green-500/10 text-green-600 rounded-full border border-green-500/20">
                            Offline Ready
                        </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                        Your conversions happen locally on your device. No data is sent to our servers.
                    </p>
                </div>

                {/* Network Monitor */}
                <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Globe className="h-3 w-3" /> Network Activity
                    </h4>
                    <div className="space-y-2">
                        {requests.map(req => (
                            <div key={req.id} className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                                <span className="text-foreground">{req.name}</span>
                                <span className={`flex items-center gap-1.5 ${req.status === 'Blocked' ? 'text-red-500' :
                                    req.status.includes('Offline') ? 'text-green-500' : 'text-blue-500'
                                    }`}>
                                    <span className={`h-1.5 w-1.5 rounded-full ${req.status === 'Blocked' ? 'bg-red-500' :
                                        req.status.includes('Offline') ? 'bg-green-500' : 'bg-blue-500'
                                        }`} />
                                    {req.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Incognito Toggle */}
                <div className="pt-3 border-t border-border mt-2">
                    <label className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-2">
                            <EyeOff className={`h-4 w-4 transition-colors ${isIncognito ? 'text-primary' : 'text-muted-foreground'}`} />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Incognito Mode</span>
                                <span className="text-[10px] text-muted-foreground">Block analytics & tracking</span>
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={isIncognito}
                                onChange={(e) => setIsIncognito(e.target.checked)}
                            />
                            <div className={`w-10 h-6 rounded-full transition-colors border ${isIncognito ? 'bg-primary border-primary' : 'bg-secondary border-input'
                                }`}></div>
                            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${isIncognito ? 'translate-x-[16px]' : 'translate-x-0'
                                }`}></div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}
