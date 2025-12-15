'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageDropzoneProps {
    onImageSelect: (file: File) => void;
    className?: string;
    description?: string;
    accept?: Record<string, string[]>;
    supportedFileTypes?: string;
}

export function ImageDropzone({
    onImageSelect,
    className,
    description = "Drag & drop an image here, or click to select",
    accept = {
        'image/jpeg': [],
        'image/png': [],
        'image/webp': [],
    },
    supportedFileTypes = "Supports JPG, PNG, WEBP"
}: ImageDropzoneProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.[0]) {
            onImageSelect(acceptedFiles[0]);
        }
    }, [onImageSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxFiles: 1,
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                "border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-4 min-h-[300px]",
                isDragActive
                    ? "border-primary bg-primary/5 scale-[1.01]"
                    : "border-border hover:border-primary/50 hover:bg-secondary/30",
                className
            )}
        >
            <input {...getInputProps()} />

            <div className={cn(
                "p-4 rounded-full transition-transform duration-300",
                isDragActive ? "bg-primary/10  scale-110" : "bg-secondary group-hover:scale-110"
            )}>
                {isDragActive ? (
                    <Upload className="h-8 w-8 text-primary animate-bounce" />
                ) : (
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                )}
            </div>

            <div className="space-y-1">
                <p className="text-lg font-medium">
                    {isDragActive ? "Drop it like it's hot!" : "Upload File"}
                </p>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    {description}
                </p>
            </div>

            <div className="text-xs text-muted-foreground mt-2 px-3 py-1 rounded-full bg-secondary/50 border border-border/50">
                {supportedFileTypes}
            </div>
        </div>
    );
}
