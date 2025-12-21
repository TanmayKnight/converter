
'use client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib-plus-encrypt';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Upload, Lock, FileText, Eye, EyeOff, X, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

export default function ProtectPdfClient({ isPro }: { isPro: boolean }) {
    const [file, setFile] = useState<File | null>(null);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const checkUsageLimit = () => {
        if (isPro) return true;
        const STORAGE_KEY = 'unitmaster_protect_daily_limit';
        const today = new Date().toDateString();
        try {
            const usageData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            const currentCount = usageData.date === today ? (usageData.count || 0) : 0;
            const DAILY_LIMIT = 3;

            if (currentCount >= DAILY_LIMIT) {
                setShowUpgradeModal(true);
                return false;
            }
            return true;
        } catch (e) { return true; }
    };

    const incrementUsage = () => {
        if (isPro) return;
        const STORAGE_KEY = 'unitmaster_protect_daily_limit';
        const today = new Date().toDateString();
        const usageData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const currentCount = usageData.date === today ? (usageData.count || 0) : 0;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: currentCount + 1 }));
    };

    const onDrop = (acceptedFiles: File[]) => {
        const uploadedFile = acceptedFiles[0];
        if (uploadedFile && uploadedFile.type === 'application/pdf') {
            setFile(uploadedFile);
        } else {
            toast.error('Please upload a valid PDF file.');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const handleProtect = async () => {
        if (!file) return;
        if (!password) {
            toast.error('Please enter a password');
            return;
        }

        if (!checkUsageLimit()) return;

        setIsProcessing(true);

        // Artificial Delay for Free Users
        if (!isPro) {
            await new Promise(resolve => setTimeout(resolve, 30000));
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);



            // Encryption - Now using pdf-lib-plus-encrypt
            const docAny = pdfDoc as any;
            await docAny.encrypt({
                userPassword: password,
                ownerPassword: password, // Simple mode: same pass for both
                permissions: {
                    printing: 'highResolution',
                    modifying: false,
                    copying: false,
                    annotating: false,
                    fillingForms: false,
                    contentAccessibility: false,
                    documentAssembly: false,
                },
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `protected_${file.name}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            incrementUsage();
            toast.success('PDF Protected Successfully!');

        } catch (error) {
            console.error(error);
            toast.error('Failed to protect PDF.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (!file) {
        return (
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors min-h-[400px] flex flex-col items-center justify-center
                ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-secondary/50'}`}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-4">
                    <div className="p-6 bg-blue-100 dark:bg-blue-900/20 rounded-full text-blue-600">
                        <Lock className="h-10 w-10" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Drop PDF to Protect</h3>
                        <p className="text-muted-foreground">or click to browse</p>
                    </div>
                    <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> 256-bit Encryption</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Upgrade Modal */}
            <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogTitle className="text-center text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
                        Upgrade to UnitMaster Pro
                    </DialogTitle>
                    <div className="text-center space-y-4 py-4">
                        <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-full w-fit mx-auto">
                            <Lock className="w-8 h-8 text-orange-500" />
                        </div>
                        <DialogDescription className="text-center text-base">
                            You have reached the daily limit of 3 free protected documents.
                            Upgrade to Pro for unlimited encryption.
                        </DialogDescription>
                        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 border-0" onClick={() => window.location.href = '/pricing'}>
                            Unlock Unlimited Access
                        </Button>
                        <Button variant="ghost" onClick={() => setShowUpgradeModal(false)} className="w-full">
                            Maybe Later
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Card className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                            <FileText className="h-8 w-8 text-red-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">{file.name}</h3>
                            <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => { setFile(null); setPassword(''); }}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="password">Set Encryption Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Note: If you lose this password, the file cannot be recovered.
                        </p>
                    </div>

                    <Button
                        className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleProtect}
                        disabled={isProcessing || !password}
                    >
                        {isProcessing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Lock className="mr-2 h-5 w-5" />}
                        Encrypt PDF
                    </Button>
                </div>
            </Card>
        </div>
    );
}
