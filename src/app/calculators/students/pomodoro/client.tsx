'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Coffee, Briefcase, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";

type TimerMode = 'work' | 'break' | 'longBreak';

const MODES: Record<TimerMode, { label: string; minutes: number; color: string }> = {
    work: { label: 'Focus', minutes: 25, color: 'text-primary' },
    break: { label: 'Short Break', minutes: 5, color: 'text-green-500' },
    longBreak: { label: 'Long Break', minutes: 15, color: 'text-blue-500' },
};

export function PomodoroTimer() {
    const [mode, setMode] = useState<TimerMode>('work');
    const [timeLeft, setTimeLeft] = useState(MODES.work.minutes * 60);
    const [isActive, setIsActive] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Audio Ref
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // interval for timer
        let interval: NodeJS.Timeout | null = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Timer finished
            setIsActive(false);
            if (soundEnabled && audioRef.current) {
                audioRef.current.play().catch(e => console.error("Audio play failed", e));
            }
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft, soundEnabled]);

    // Update browser title
    useEffect(() => {
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const seconds = (timeLeft % 60).toString().padStart(2, '0');
        document.title = `${minutes}:${seconds} - ${MODES[mode].label} | UnitMaster`;

        return () => {
            document.title = 'Pomodoro Timer | UnitMaster'; // Reset on unmount
        }
    }, [timeLeft, mode]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(MODES[mode].minutes * 60);
    };

    const changeMode = (newMode: TimerMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(MODES[newMode].minutes * 60);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const progress = 100 - (timeLeft / (MODES[mode].minutes * 60)) * 100;

    return (
        <div className="max-w-xl mx-auto space-y-8">

            {/* Hidden Audio Element for Alarm */}
            <audio ref={audioRef} src="/sounds/alarm_beep.mp3" preload="auto" />

            <Card className="border-border/50 shadow-lg overflow-hidden relative">
                {/* Background Progress Bar (Subtle) */}
                <div
                    className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                />

                <CardContent className="p-8 md:p-12 flex flex-col items-center justify-center space-y-8">

                    {/* Mode Selector */}
                    <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-full">
                        <Button
                            variant={mode === 'work' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => changeMode('work')}
                            className="rounded-full px-6"
                        >
                            Focus
                        </Button>
                        <Button
                            variant={mode === 'break' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => changeMode('break')}
                            className={cn("rounded-full px-6", mode === 'break' && "bg-green-600 hover:bg-green-700")}
                        >
                            Short Check
                        </Button>
                        <Button
                            variant={mode === 'longBreak' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => changeMode('longBreak')}
                            className={cn("rounded-full px-6", mode === 'longBreak' && "bg-blue-600 hover:bg-blue-700")}
                        >
                            Long Break
                        </Button>
                    </div>

                    {/* Timer Display */}
                    <div className="text-center space-y-4">
                        <div className={cn("text-8xl md:text-9xl font-mono font-bold tracking-tighter tabular-nums select-none transition-colors", isActive ? "text-foreground" : "text-muted-foreground/80")}>
                            {formatTime(timeLeft)}
                        </div>
                        <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">
                            {isActive ? 'Running' : 'Paused'}
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-6">
                        <Button
                            size="icon"
                            variant="outline"
                            className="w-12 h-12 rounded-full border-2"
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            title={soundEnabled ? "Mute Sound" : "Enable Sound"}
                        >
                            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-muted-foreground" />}
                        </Button>

                        <Button
                            size="lg"
                            className={cn("w-24 h-24 rounded-full shadow-xl text-3xl transition-transform active:scale-95", isActive ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90")}
                            onClick={toggleTimer}
                        >
                            {isActive ? <Pause className="w-10 h-10 ml-0.5 fill-current" /> : <Play className="w-10 h-10 ml-1.5 fill-current" />}
                        </Button>

                        <Button
                            size="icon"
                            variant="outline"
                            className="w-12 h-12 rounded-full border-2"
                            onClick={resetTimer}
                            title="Reset Timer"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </Button>
                    </div>

                </CardContent>
            </Card>

            {/* Helper Text */}
            <div className="text-center space-y-2 text-muted-foreground max-w-sm mx-auto">
                <p className="text-sm">
                    <span className="font-semibold text-foreground">Tip:</span> The timer will continue running in this tab even if you switch to another window.
                </p>
            </div>
        </div>
    );
}
