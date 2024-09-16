"use client";

import React, { useState } from "react";
import {
    format,
    eachDayOfInterval,
    startOfWeek,
    endOfWeek,
    addWeeks,
    subWeeks,
    startOfMonth,
    endOfMonth,
    isSameMonth,
    getWeeksInMonth,
    isWeekend,
    addMonths,
    subMonths,
} from "date-fns";
import { fr } from "date-fns/locale";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { CalendarData } from "@/app/calendar/page";
import { Schedule } from "@/lib/test-data/calendar";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface CalendarProps {
    data: CalendarData;
}

export default function Calendar({ data }: CalendarProps) {
    const { users, schedules } = data;
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const weeksInMonth = getWeeksInMonth(currentDate);

    const days = eachDayOfInterval({
        start: addWeeks(startDate, currentWeekIndex),
        end: addWeeks(startDate, currentWeekIndex + 1),
    }).filter((day) => isSameMonth(day, currentDate) && !isWeekend(day));

    const getStatusForDay = (
        userId: number,
        date: Date
    ): { status: Schedule["status"] | "unknown"; meeting: boolean } => {
        const schedule = schedules.find(
            (s) => s.userId === userId && s.date === format(date, "yyyy-MM-dd")
        );
        if (!schedule) return { status: "unknown", meeting: false };
        return { status: schedule.status, meeting: schedule.meeting };
    };

    const getStatusBadge = (status: Schedule["status"] | "unknown") => {
        switch (status) {
            case "work":
                return <Badge variant="default">Travail</Badge>;
            case "off":
                return <Badge variant="destructive">Congé</Badge>;
            case "half-day":
                return <Badge variant="outline">Demi-journée</Badge>;
            default:
                return <Badge variant="secondary">Inconnu</Badge>;
        }
    };

    const goToPreviousWeek = () =>
        setCurrentWeekIndex((prev) => Math.max(0, prev - 1));
    const goToNextWeek = () =>
        setCurrentWeekIndex((prev) => Math.min(weeksInMonth - 1, prev + 1));

    const months = Array.from(
        { length: 12 },
        (_, i) => new Date(currentDate.getFullYear(), i, 1)
    );
    const years = Array.from(
        { length: 10 },
        (_, i) => new Date().getFullYear() - 5 + i
    );

    const handleMonthChange = (month: string) => {
        const newDate = new Date(currentDate.getFullYear(), parseInt(month), 1);
        setCurrentDate(newDate);
        setCurrentWeekIndex(0);
    };

    const handleYearChange = (year: string) => {
        const newDate = new Date(parseInt(year), currentDate.getMonth(), 1);
        setCurrentDate(newDate);
        setCurrentWeekIndex(0);
    };

    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>Planning</CardTitle>
                <CardDescription className="flex flex-row justify-between py-4">
                    Retrouvez les jours de présence et d'absences ainsi que les
                    réunions planifiées
                </CardDescription>
                <div className="flex items-center space-x-2">
                    <Select
                        onValueChange={handleMonthChange}
                        value={currentDate.getMonth().toString()}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sélectionner un mois" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((month, index) => (
                                <SelectItem
                                    key={index}
                                    value={index.toString()}
                                >
                                    {format(month, "MMMM", { locale: fr })}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={handleYearChange}
                        value={currentDate.getFullYear().toString()}
                    >
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Sélectionner une année" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={goToPreviousWeek}
                        variant="outline"
                        size="icon"
                        disabled={currentWeekIndex === 0}
                    >
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <span className="font-medium">
                        Semaine {currentWeekIndex + 1} sur {weeksInMonth}
                    </span>
                    <Button
                        onClick={goToNextWeek}
                        variant="outline"
                        size="icon"
                        disabled={currentWeekIndex === weeksInMonth - 1}
                    >
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="bg-muted">
                                Utilisateur
                            </TableHead>
                            {days.map((day) => (
                                <TableHead
                                    key={day.toISOString()}
                                    className="bg-muted"
                                >
                                    {format(day, "EEE d", { locale: fr })}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    {user.name}
                                </TableCell>
                                {days.map((day) => {
                                    const { status, meeting } = getStatusForDay(
                                        user.id,
                                        day
                                    );
                                    return (
                                        <TableCell key={day.toISOString()}>
                                            <div className="flex items-center space-x-2">
                                                {getStatusBadge(status)}
                                                {meeting && (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <CalendarIcon className="h-4 w-4 text-blue-500" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>
                                                                    Réunion
                                                                    prévue
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                )}
                                            </div>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}
