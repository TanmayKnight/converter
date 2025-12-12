
'use client';

import { useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { UploadCloud, File, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a utils file for clsx/tailwind-merge

interface FileUploaderProps {
    onFilesSelected: (files: File[]) => void;
    acceptedFileTypes?: Record<string, string[]>; // e.g., { 'application/pdf': ['.pdf'] }
    maxFiles?: number;
    maxSize?: number; // in bytes
    className?: string;
    description?: string;
}

export function FileUploader({
    onFilesSelected,
    acceptedFileTypes = { 'application/pdf': ['.pdf'] },
    maxFiles = 10,
    maxSize = 50 * 1024 * 1024, // 50MB
    className,
    description = "Drag & drop your files here, or click to select"
}: FileUploaderProps) {
    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if (acceptedFiles.length > 0) {
            onFilesSelected(acceptedFiles);
        }

        if (fileRejections.length > 0) {
            // You might want to handle errors better here, e.g. toast notification
            console.warn('Rejected files:', fileRejections);
            alert(`Some files were rejected. Please ensure they are valid PDFs and under ${maxSize / 1024 / 1024}MB.`);
        }
    }, [onFilesSelected, maxSize]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFileTypes,
        maxFiles,
        maxSize,
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                "border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ease-in-out",
                isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-secondary/50",
                className
            )}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                <div className={cn(
                    "p-4 rounded-full bg-secondary transition-transform duration-200",
                    isDragActive ? "scale-110" : ""
                )}>
                    <UploadCloud className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                    <p className="text-lg font-medium text-foreground">
                        {isDragActive ? "Drop files now" : description}
                    </p>
                    <p className="text-xs">
                        Max file size: {Math.round(maxSize / 1024 / 1024)}MB
                    </p>
                </div>
            </div>
        </div>
    );
}

interface SelectedFileListProps {
    files: File[];
    onRemove: (index: number) => void;
}

export function SelectedFileList({ files, onRemove }: SelectedFileListProps) {
    if (files.length === 0) return null;

    return (
        <div className="grid gap-2 mt-4">
            {files.map((file, index) => (
                <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg shadow-sm group">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-md">
                            <File className="w-5 h-5" />
                        </div>
                        <div className="truncate">
                            <p className="text-sm font-medium truncate max-w-[200px] md:max-w-[400px]">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onRemove(index)}
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                        aria-label="Remove file"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    )
}
