'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, GraduationCap, Calculator } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type ReferenceGrade = {
    label: string;
    points: number;
};

const GRADES: ReferenceGrade[] = [
    { label: 'A', points: 4.0 },
    { label: 'A-', points: 3.7 },
    { label: 'B+', points: 3.3 },
    { label: 'B', points: 3.0 },
    { label: 'B-', points: 2.7 },
    { label: 'C+', points: 2.3 },
    { label: 'C', points: 2.0 },
    { label: 'C-', points: 1.7 },
    { label: 'D+', points: 1.3 },
    { label: 'D', points: 1.0 },
    { label: 'D-', points: 0.7 },
    { label: 'F', points: 0.0 },
];

type Course = {
    id: string;
    name: string;
    grade: number;
    credits: number;
};

export default function GPACalculatorClient() {
    // Semester Courses
    const [courses, setCourses] = useState<Course[]>([
        { id: '1', name: 'Course 1', grade: 4.0, credits: 3 },
        { id: '2', name: 'Course 2', grade: 4.0, credits: 3 },
        { id: '3', name: 'Course 3', grade: 4.0, credits: 3 },
        { id: '4', name: 'Course 4', grade: 4.0, credits: 3 },
    ]);

    // Previous Cumulative Data
    const [prevGpa, setPrevGpa] = useState<string>('');
    const [prevCredits, setPrevCredits] = useState<string>('');

    // Results
    const [semesterGpa, setSemesterGpa] = useState<number>(0);
    const [cumulativeGpa, setCumulativeGpa] = useState<number>(0);
    const [totalCredits, setTotalCredits] = useState<number>(0);

    // Calculate whenever inputs change
    useEffect(() => {
        // 1. Calculate Semester GPA
        let semPoints = 0;
        let semCredits = 0;

        courses.forEach(course => {
            if (course.credits > 0) {
                semPoints += course.grade * course.credits;
                semCredits += course.credits;
            }
        });

        const sGpa = semCredits > 0 ? semPoints / semCredits : 0;
        setSemesterGpa(parseFloat(sGpa.toFixed(2)));

        // 2. Calculate Cumulative GPA (if previous data provided)
        let cumPoints = semPoints;
        let cumCredits = semCredits;

        if (prevGpa && prevCredits) {
            const pGpa = parseFloat(prevGpa);
            const pCredits = parseFloat(prevCredits);
            if (!isNaN(pGpa) && !isNaN(pCredits)) {
                cumPoints += pGpa * pCredits;
                cumCredits += pCredits;
            }
        }

        const cGpa = cumCredits > 0 ? cumPoints / cumCredits : 0;
        setCumulativeGpa(parseFloat(cGpa.toFixed(2)));
        setTotalCredits(cumCredits);

    }, [courses, prevGpa, prevCredits]);

    const addCourse = () => {
        setCourses([
            ...courses,
            { id: Math.random().toString(), name: `Course ${courses.length + 1}`, grade: 4.0, credits: 3 }
        ]);
    };

    const removeCourse = (id: string) => {
        if (courses.length > 1) {
            setCourses(courses.filter(c => c.id !== id));
        }
    };

    const updateCourse = (id: string, field: keyof Course, value: any) => {
        setCourses(courses.map(c => {
            if (c.id === id) {
                return { ...c, [field]: value };
            }
            return c;
        }));
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Card className="border-2 border-primary/10 shadow-lg">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <GraduationCap className="h-6 w-6 text-primary" />
                            Current Semester
                        </CardTitle>
                        <CardDescription>
                            Enter your classes, grades, and credit hours.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="hidden md:grid grid-cols-12 gap-4 mb-2 font-medium text-muted-foreground px-2">
                            <div className="col-span-5">Course Name</div>
                            <div className="col-span-3">Grade</div>
                            <div className="col-span-3">Credits</div>
                            <div className="col-span-1"></div>
                        </div>

                        {courses.map((course) => (
                            <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center bg-muted/30 p-3 rounded-lg md:bg-transparent md:p-0">
                                <div className="col-span-1 md:col-span-5">
                                    <Label className="md:hidden mb-1 block text-xs">Course Name</Label>
                                    <Input
                                        placeholder="e.g. Calculus 101"
                                        value={course.name}
                                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                                        className="bg-background"
                                    />
                                </div>
                                <div className="col-span-1 md:col-span-3">
                                    <Label className="md:hidden mb-1 block text-xs">Grade</Label>
                                    <Select
                                        value={course.grade.toString()}
                                        onValueChange={(val) => updateCourse(course.id, 'grade', parseFloat(val))}
                                    >
                                        <SelectTrigger className="bg-background">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {GRADES.map((g) => (
                                                <SelectItem key={g.label} value={g.points.toString()}>
                                                    {g.label} ({g.points})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-1 md:col-span-3">
                                    <Label className="md:hidden mb-1 block text-xs">Credits</Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        step="0.5"
                                        value={course.credits}
                                        onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                                        className="bg-background"
                                    />
                                </div>
                                <div className="col-span-1 flex justify-end">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeCourse(course.id)}
                                        className="text-muted-foreground hover:text-destructive"
                                        disabled={courses.length <= 1}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <Button onClick={addCourse} variant="outline" className="w-full mt-4 border-dashed">
                            <Plus className="mr-2 h-4 w-4" /> Add Another Course
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Cumulative GPA (Optional)</CardTitle>
                        <CardDescription>
                            Include your previous semesters to see your overall standing.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Previous Cumulative GPA</Label>
                            <Input
                                type="number"
                                placeholder="e.g. 3.5"
                                step="0.01"
                                value={prevGpa}
                                onChange={(e) => setPrevGpa(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Previous Total Credits</Label>
                            <Input
                                type="number"
                                placeholder="e.g. 60"
                                value={prevCredits}
                                onChange={(e) => setPrevCredits(e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                    <Card className="bg-primary text-primary-foreground border-none shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calculator className="h-5 w-5" />
                                Your Result
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                                <div className="text-sm font-medium opacity-80 mb-1">Semester GPA</div>
                                <div className="text-5xl font-bold tracking-tight">{semesterGpa.toFixed(2)}</div>
                            </div>

                            {prevGpa && (
                                <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <div className="text-sm font-medium opacity-80 mb-1">Cumulative GPA</div>
                                    <div className="text-5xl font-bold tracking-tight">{cumulativeGpa.toFixed(2)}</div>
                                    <div className="text-xs mt-2 opacity-70">Total Credits: {totalCredits}</div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Alert>
                        <AlertTitle>Did you know?</AlertTitle>
                        <AlertDescription className="text-sm text-muted-foreground mt-1">
                            Most colleges use a 4.0 scale. An 'A' is 4.0, while a 'B' is 3.0. Your GPA is the weighted average based on credit hours.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </div>
    );
}
