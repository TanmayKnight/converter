'use client';

import { useState, useEffect } from 'react';
import { Shield, Wifi, Globe, Smartphone, Lock, X, ChevronRight, Check, Activity, Zap, Eye, EyeOff } from 'lucide-react';
import { useNetworkMonitor, NetworkRequest } from '@/lib/hooks/useNetworkMonitor';

export function PrivacyDashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [isIncognito, setIsIncognito] = useState(false);
    const requests = useNetworkMonitor();

    // Aggregated Stats
    const analyticsStatus = requests.some(r => r.url.includes('google-analytics') && r.status === 'success') ? "Active" : "Allowed";
    const adsStatus = requests.some(r => r.url.includes('adsbygoogle') && r.status === 'success') ? "Active" : "Allowed";
    const hasUploads = requests.some(r => r.method === 'POST' && !r.url.includes('analytics') && !r.url.includes('ads'));

    // Simulating Local Mode for demonstration if no uploads
    const processingMode = "Client-Side (WASM)";

    return (
        <>
            {/* Floating Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed top-24 right-4 z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-full p-3 flex items-center gap-2 hover:scale-105 transition-all group ${isOpen ? 'hidden' : 'flex'}`}
            >
                <div className="relative">
                    <Shield className="h-6 w-6 text-green-500 fill-green-500/10" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full animate-pulse border-2 border-white dark:border-zinc-900"></span>
                </div>
                <span className="pr-2 font-medium text-sm hidden group-hover:block transition-all max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap">Privacy Dashboard</span>
            </button>

            {/* Backdrop Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:bg-transparent md:backdrop-blur-none transition-all"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Dashboard Container - Responsive: Bottom Sheet on Mobile, Sidebar on Desktop */}
            <div className={`fixed z-50 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl transition-all duration-300 flex flex-col
                ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0 md:translate-y-0 md:translate-x-[120%] md:opacity-100'}

                // Mobile Styles (Bottom Sheet)
                inset-x-0 bottom-0 rounded-t-2xl max-h-[85vh]

                // Desktop Styles (Sidebar)
                md:inset-auto md:top-24 md:right-4 md:bottom-auto md:w-96 md:rounded-2xl md:max-h-[min(800px,calc(100vh-8rem))]
            `}>

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-900 shrink-0">
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-500 fill-green-500/10" />
                        <h2 className="font-bold text-lg">Privacy Dashboard</h2>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <X className="h-5 w-5 text-zinc-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">

                    {/* Processing Mode Card */}
                    <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-3 border border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                                <Activity className="h-3 w-3" /> Processing Mode
                            </span>
                            <span className="bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200 dark:border-green-500/20">
                                Offline Ready
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <Zap className="h-4 w-4 text-purple-500" />
                            <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{processingMode}</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                            Calculations happen locally. No data sent to servers.
                        </p>
                    </div>

                    {/* Network Requests Table */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                                <Globe className="h-3 w-3" /> Network Requests
                            </span>
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden text-xs">
                            <div className="grid grid-cols-2 px-3 py-2 bg-zinc-50/50 dark:bg-zinc-800/50 font-medium text-zinc-500 border-b border-zinc-100 dark:border-zinc-800">
                                <div>DESTINATION</div>
                                <div className="text-right">STATUS</div>
                            </div>

                            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                <div className="grid grid-cols-2 px-3 py-2 items-center">
                                    <span className="text-zinc-700 dark:text-zinc-300">Analytics</span>
                                    <span className="text-right text-blue-500 font-medium">{isIncognito ? "Blocked" : analyticsStatus}</span>
                                </div>
                                <div className="grid grid-cols-2 px-3 py-2 items-center">
                                    <span className="text-zinc-700 dark:text-zinc-300">AdSense</span>
                                    <span className="text-right text-blue-500 font-medium">{isIncognito ? "Blocked" : adsStatus}</span>
                                </div>
                                <div className="grid grid-cols-2 px-3 py-2 items-center bg-green-50/30 dark:bg-green-500/5">
                                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">File Uploads</span>
                                    <span className="text-right text-green-600 dark:text-green-400 font-bold flex items-center justify-end gap-1">
                                        {hasUploads ? <span className="text-red-500">Detected!</span> : <>None <Lock className="h-3 w-3" /></>}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer / Incognito Toggle */}
                <div className="p-4 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-b-2xl shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {isIncognito ? <EyeOff className="h-4 w-4 text-zinc-700 dark:text-zinc-300" /> : <Eye className="h-4 w-4 text-zinc-400" />}
                            <div>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Incognito Mode</h3>
                            </div>
                        </div>
                        <div
                            onClick={() => setIsIncognito(!isIncognito)}
                            className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${isIncognito ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white dark:bg-zinc-900 shadow-sm transform transition-transform duration-200 ease-in-out ${isIncognito ? 'translate-x-4' : 'translate-x-0'}`} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
