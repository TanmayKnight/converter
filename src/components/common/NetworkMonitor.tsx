'use client';

import { useNetworkMonitor, NetworkRequest } from '@/lib/hooks/useNetworkMonitor';
import { Activity, Shield, CheckCircle2, AlertCircle, Clock, Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function NetworkMonitor() {
    const requests = useNetworkMonitor();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [autoScroll, setAutoScroll] = useState(true);

    // Auto-scroll to bottom
    useEffect(() => {
        if (autoScroll && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [requests, autoScroll]);

    // Categorize requests
    const getCategory = (url: string) => {
        if (url.includes('google-analytics') || url.includes('gtag')) return 'Analytics';
        if (url.includes('adsbygoogle') || url.includes('doubleclick')) return 'AdSense';
        if (url.includes('fonts.googleapis') || url.includes('gstatic')) return 'Fonts';
        if (url.startsWith('/') || url.includes(window.location.origin)) return 'Internal';
        return 'External';
    };

    const getStatusColor = (req: NetworkRequest) => {
        if (req.status === 'pending') return 'text-blue-500 animate-pulse';
        if (req.status === 'error' || (req.statusCode && req.statusCode >= 400)) return 'text-red-500';
        return 'text-green-500';
    };

    return (
        <div className="w-full bg-black/90 text-zinc-100 rounded-xl overflow-hidden font-mono text-xs border border-zinc-800 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    <span className="font-semibold tracking-wide">LIVE NETWORK MONITOR</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 opacity-70">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span>Monitoring</span>
                    </div>
                </div>
            </div>

            {/* Request Log */}
            <div className="h-64 overflow-y-auto custom-scrollbar relative p-2 space-y-1" ref={scrollRef}>
                {requests.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-2">
                        <Shield className="h-8 w-8 opacity-20" />
                        <p>No network activity detected.</p>
                        <p className="text-[10px] opacity-60">Your files are being processed locally.</p>
                    </div>
                )}

                {requests.map((req) => {
                    const category = getCategory(req.url);
                    const isAllowed = ['Analytics', 'AdSense', 'Fonts', 'Internal'].includes(category);
                    const displayUrl = req.url.length > 50 ? '...' + req.url.slice(-50) : req.url;

                    return (
                        <div key={req.id} className="flex items-center gap-3 p-1.5 hover:bg-zinc-800/50 rounded transition-colors group">
                            <span className="opacity-40 min-w-[60px]">
                                {new Date(req.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </span>

                            <span className={`h-5 flex items-center border border-zinc-700/50 rounded-sm px-1.5 font-normal uppercase w-12 justify-center text-[10px] ${req.method === 'GET' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'
                                }`}>
                                {req.method}
                            </span>

                            <div className="flex-1 truncate relative">
                                <span className={isAllowed ? 'opacity-80' : 'text-yellow-400'}>{displayUrl}</span>
                            </div>

                            <div className="flex items-center gap-2 min-w-[100px] justify-end">
                                {category !== 'Internal' && (
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${isAllowed ? 'bg-zinc-800 text-zinc-400' : 'bg-red-900/30 text-red-400 border border-red-900/50'
                                        }`}>
                                        {category}
                                    </span>
                                )}
                                <span className={`flex items-center gap-1 font-bold ${getStatusColor(req)}`}>
                                    {req.status === 'pending' ? (
                                        <Clock className="h-3 w-3" />
                                    ) : req.status === 'success' ? (
                                        <span className="text-[10px]">{req.statusCode || 200}</span>
                                    ) : (
                                        <AlertCircle className="h-3 w-3" />
                                    )}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer Legend */}
            <div className="px-3 py-1.5 bg-zinc-900 border-t border-zinc-800 flex justify-between text-[10px] text-zinc-500">
                <div className="flex gap-4">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Pending</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Success</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Error</span>
                </div>
                <div className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    <span>All Traffic Monitored</span>
                </div>
            </div>
        </div>
    );
}
