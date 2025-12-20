'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eraser } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SignaturePadProps {
    onSave: (dataUrl: string) => void;
    onCancel: () => void;
}

export function SignaturePad({ onSave, onCancel }: SignaturePadProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // 1. Setup Canvas for Retina/High-DPI
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        // Increase resolution
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        // Scale context to match
        ctx.scale(dpr, dpr);

        // Set style width/height
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        // 2. Default Style
        ctx.lineWidth = 2; // Thicker line for signature
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#000'; // Black ink

    }, []);

    const getPos = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true);
        setHasDrawn(true);
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clear = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        // Logic to clear retina canvas
        ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
        setHasDrawn(false);
    };

    const handleSave = () => {
        if (!hasDrawn) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        // Export transparent PNG
        const dataUrl = canvas.toDataURL('image/png');
        onSave(dataUrl);
    };

    return (
        <Card className="p-4 w-full max-w-md mx-auto space-y-4">
            <h3 className="font-semibold text-center">Draw Your Signature</h3>

            <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden relative bg-white touch-none">
                <canvas
                    ref={canvasRef}
                    className="w-full h-48 block cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
                {!hasDrawn && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-2xl font-handwriting select-none">
                        Sign Here
                    </div>
                )}
            </div>

            <div className="flex gap-2 justify-between">
                <Button variant="ghost" onClick={clear} type="button" className="text-destructive hover:text-destructive">
                    <Eraser className="h-4 w-4 mr-2" />
                    Clear
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button onClick={handleSave} disabled={!hasDrawn}>Use Signature</Button>
                </div>
            </div>
        </Card>
    );
}
