'use client';

import { useState, useEffect } from 'react';

export type NetworkRequest = {
    id: string;
    url: string;
    method: string;
    status: 'pending' | 'success' | 'error';
    statusCode?: number;
    timestamp: number;
    type: 'fetch' | 'xhr';
    duration?: number;
};

// Global event emitter for network requests
// This ensures we catch requests even before the component mounts if possible,
// or at least shares the state across multiple instances.
class NetworkObserver {
    private listeners: ((req: NetworkRequest) => void)[] = [];
    private requests: NetworkRequest[] = [];
    private isPatched = false;

    constructor() {
        if (typeof window !== 'undefined') {
            this.patchFetch();
            this.patchXHR();
        }
    }

    subscribe(listener: (req: NetworkRequest) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notify(req: NetworkRequest) {
        // Update local cache
        const index = this.requests.findIndex(r => r.id === req.id);
        if (index >= 0) {
            this.requests[index] = req;
        } else {
            this.requests.unshift(req);
            // Keep last 50
            if (this.requests.length > 50) this.requests.pop();
        }

        this.listeners.forEach(l => l(req));
    }

    private patchFetch() {
        if (this.isPatched) return;
        const originalFetch = window.fetch;

        window.fetch = async (...args) => {
            const url = args[0].toString();
            // Ignore Next.js hot reload / internal stuff if desired, but for transparency we keep most.
            // Maybe ignore base64 data URIs?
            if (url.startsWith('data:')) return originalFetch(...args);

            const method = args[1]?.method || 'GET';
            const id = Math.random().toString(36).substring(7);
            const startTime = performance.now();

            this.notify({
                id,
                url,
                method,
                status: 'pending',
                timestamp: Date.now(),
                type: 'fetch'
            });

            try {
                const response = await originalFetch(...args);
                this.notify({
                    id,
                    url,
                    method,
                    status: response.ok ? 'success' : 'error',
                    statusCode: response.status,
                    timestamp: Date.now(),
                    type: 'fetch',
                    duration: performance.now() - startTime
                });
                return response;
            } catch (error) {
                this.notify({
                    id,
                    url,
                    method,
                    status: 'error',
                    timestamp: Date.now(),
                    type: 'fetch',
                    duration: performance.now() - startTime
                });
                throw error;
            }
        };
        this.isPatched = true;
    }

    private patchXHR() {
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;
        const self = this;

        XMLHttpRequest.prototype.open = function (method: string, url: string | URL) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const xhr = this as any;
            xhr._url = url.toString();
            xhr._method = method;
            xhr._id = Math.random().toString(36).substring(7);
            return originalOpen.apply(this, arguments as any);
        };

        XMLHttpRequest.prototype.send = function () {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const xhr = this as any;

            if (xhr._url && !xhr._url.startsWith('data:')) {
                const id = xhr._id;
                const url = xhr._url;
                const method = xhr._method;
                const startTime = performance.now();

                self.notify({
                    id,
                    url,
                    method,
                    status: 'pending',
                    timestamp: Date.now(),
                    type: 'xhr'
                });

                this.addEventListener('load', () => {
                    self.notify({
                        id,
                        url,
                        method,
                        status: xhr.status >= 200 && xhr.status < 300 ? 'success' : 'error',
                        statusCode: xhr.status,
                        timestamp: Date.now(),
                        type: 'xhr',
                        duration: performance.now() - startTime
                    });
                });

                this.addEventListener('error', () => {
                    self.notify({
                        id,
                        url,
                        method,
                        status: 'error',
                        timestamp: Date.now(),
                        type: 'xhr',
                        duration: performance.now() - startTime
                    });
                });
            }
            return originalSend.apply(this, arguments as any);
        };
    }
}

// Singleton instance
let networkObserver: NetworkObserver | null = null;

export function useNetworkMonitor() {
    const [requests, setRequests] = useState<NetworkRequest[]>([]);

    useEffect(() => {
        if (!networkObserver) {
            networkObserver = new NetworkObserver();
        }

        const handleUpdate = (updatedReq: NetworkRequest) => {
            setRequests(prev => {
                const index = prev.findIndex(r => r.id === updatedReq.id);
                if (index >= 0) {
                    const newReqs = [...prev];
                    newReqs[index] = updatedReq;
                    return newReqs;
                } else {
                    return [updatedReq, ...prev].slice(0, 50);
                }
            });
        };

        const unsubscribe = networkObserver.subscribe(handleUpdate);
        return () => unsubscribe();
    }, []);

    return requests;
}
