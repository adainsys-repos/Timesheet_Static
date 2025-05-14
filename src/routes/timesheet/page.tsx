import RouteHeader from '@/components/common/route-header';
import { ChevronLeft, ChevronRight, Copy, RefreshCw, RotateCcw, Trash2, CheckCircle2, CalendarIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SelectItem } from '@/components/ui/select';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays } from 'date-fns';
import React, { useState } from 'react';
import ToolTip from '@/components/common/tool-tip';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';

interface TimeEntry {
    time: string;
    task: string;
    subtask: string;
    hours: number;
}

interface Row {
    id: number;
    project: string;
    hours: {
        daily: number[]; // Array of 7 daily hours
        total: number;
    };
    entries: TimeEntry[];
}

export default function Timesheet() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const MAX_DAILY_HOURS = 8;

    // Generate 7 days starting from the selected date
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const day = addDays(selectedDate, i);
        return {
            date: day,
            dayNum: format(day, 'dd'),
            dayName: format(day, 'EEE'),
            fullDate: format(day, 'yyyy-MM-dd'),
        };
    });

    // Initialize with a single row
    const [rows, setRows] = useState<Row[]>([
        {
            id: 1,
            project: '',
            hours: {
                daily: Array(7).fill(0),
                total: 0,
            },
            entries: Array(7)
                .fill(null)
                .map(() => ({
                    time: '',
                    task: '',
                    subtask: '',
                    hours: 0,
                })),
        },
    ]);

    // Update total hours when entries change
    const updateHours = (rowIndex: number, dayIndex: number, hoursValue: number) => {
        setRows((prevRows) => {
            const newRows = [...prevRows];
            const row = { ...newRows[rowIndex] };

            // Create a new daily hours array
            const newDailyHours = [...row.hours.daily];
            newDailyHours[dayIndex] = hoursValue;

            // Calculate new total
            const newTotal = newDailyHours.reduce((sum, current) => sum + current, 0);

            // Update the row with new hours
            row.hours = {
                daily: newDailyHours,
                total: newTotal,
            };

            // Update the entry
            const newEntries = [...row.entries];
            newEntries[dayIndex] = {
                ...newEntries[dayIndex],
                hours: hoursValue,
            };
            row.entries = newEntries;

            newRows[rowIndex] = row;
            return newRows;
        });
    };

    const handleTimeChange = (rowIndex: number, dayIndex: number, value: string) => {
        // Parse the time format (HH:MM) to get hours
        let hours = 0;
        let displayValue = value;

        if (value) {
            // Format the input to ensure it's in proper HH:MM format
            const timeParts = value.split(':');
            if (timeParts.length === 2) {
                let hoursVal = parseInt(timeParts[0] || '0', 10);
                let minutesVal = parseInt(timeParts[1] || '0', 10);

                // Handle minutes > 59
                if (minutesVal > 59) {
                    hoursVal += Math.floor(minutesVal / 60);
                    minutesVal = minutesVal % 60;
                }

                // Format the display value properly
                displayValue = `${hoursVal.toString().padStart(2, '0')}:${minutesVal.toString().padStart(2, '0')}`;

                // Calculate decimal hours
                hours = hoursVal + minutesVal / 60;
            } else if (timeParts.length === 1 && value.trim() !== '') {
                // If only hours are provided
                const hoursVal = parseInt(value, 10);
                displayValue = `${hoursVal.toString().padStart(2, '0')}:00`;
                hours = hoursVal;
            }
        }

        // Check if adding these hours would exceed the daily limit
        const currentDailyTotal = rows.reduce((sum, row, idx) => {
            if (idx === rowIndex) return sum; // Skip the current row
            return sum + (row.hours.daily[dayIndex] || 0);
        }, 0);

        if (currentDailyTotal + hours > MAX_DAILY_HOURS) {
            // If exceeds limit, cap the hours
            hours = Math.max(0, MAX_DAILY_HOURS - currentDailyTotal);
            // You could show an alert here
            alert(`Cannot exceed ${MAX_DAILY_HOURS} hours per day. Adjusted to ${formatHoursDisplay(hours)}.`);

            // Update display value to match the capped hours
            const wholeHours = Math.floor(hours);
            const minutes = Math.round((hours - wholeHours) * 60);
            displayValue = `${wholeHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }

        // Update the time entry and hours
        setRows((prevRows) => {
            const newRows = [...prevRows];
            const newEntries = [...newRows[rowIndex].entries];
            newEntries[dayIndex] = {
                ...newEntries[dayIndex],
                time: displayValue,
                hours: hours,
            };
            newRows[rowIndex].entries = newEntries;
            return newRows;
        });

        // Update the hours calculation
        updateHours(rowIndex, dayIndex, hours);
    };

    // Helper function to format hours display
    const formatHoursDisplay = (hours: number): string => {
        if (hours === 0) return '0h';

        const wholeHours = Math.floor(hours);
        const minutes = Math.round((hours - wholeHours) * 60);

        if (minutes === 0) {
            return `${wholeHours}h`;
        } else {
            return `${wholeHours}h ${minutes}m`;
        }
    };

    const handleAddRow = () => {
        const newRow = {
            id: rows.length + 1,
            project: '',
            hours: {
                daily: Array(7).fill(0),
                total: 0,
            },
            entries: Array(7)
                .fill(null)
                .map(() => ({
                    time: '',
                    task: '',
                    subtask: '',
                    hours: 0,
                })),
        };
        setRows([...rows, newRow]);
    };

    const handleDeleteRow = (id: number) => {
        if (rows.length > 1) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const handleCurrentDay = () => {
        const today = new Date();
        setSelectedDate(today);
    };

    const handlePreviousDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() - 1);
        setSelectedDate(newDate);
    };

    const handleNextDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + 1);
        setSelectedDate(newDate);
    };

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    // Add handlers for task and subtask selection
    const handleTaskChange = (rowIndex: number, dayIndex: number, value: string) => {
        setRows((prevRows) => {
            const newRows = [...prevRows];
            const newEntries = [...newRows[rowIndex].entries];
            newEntries[dayIndex] = {
                ...newEntries[dayIndex],
                task: value,
            };
            newRows[rowIndex].entries = newEntries;
            return newRows;
        });
    };

    const handleSubtaskChange = (rowIndex: number, dayIndex: number, value: string) => {
        setRows((prevRows) => {
            const newRows = [...prevRows];
            const newEntries = [...newRows[rowIndex].entries];
            newEntries[dayIndex] = {
                ...newEntries[dayIndex],
                subtask: value,
            };
            newRows[rowIndex].entries = newEntries;
            return newRows;
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <RouteHeader text="Timesheet" />
            <div className="bg-card rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="date-picker" className="text-primaryColor font-medium">
                                Select Date:
                            </Label>
                            <div className="relative">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-44 justify-start text-left font-normal focus:border-primaryColor focus:ring-1 focus:ring-primaryColor"
                                        >
                                            {format(selectedDate, 'PPP')}
                                            <CalendarIcon className="ml-auto h-4 w-4 text-primaryColor" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <Button variant="outline" size="sm" onClick={handleCurrentDay} className="text-primaryColor">
                            Today
                        </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="text-primaryColor font-medium">
                            {format(weekDays[0].date, 'dd MMM yyyy')} to {format(weekDays[6].date, 'dd MMM yyyy')}
                        </div>
                        <div className="flex items-center">
                            <ToolTip content="Previous Day">
                                <Button variant="ghost" size="icon" onClick={handlePreviousDay} className="text-primaryColor">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                            </ToolTip>
                            <ToolTip content="Next Day">
                                <Button variant="ghost" size="icon" onClick={handleNextDay} className="text-primaryColor">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </ToolTip>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg overflow-x-auto scrollbar-thin">
                    <div className="min-w-[1200px]">
                        <div className="grid grid-cols-[1fr,100px,repeat(7,1fr),70px] bg-primaryColor text-white">
                            <div className="p-3 text-sm font-medium text-center">Project</div>
                            <div className="p-3 text-sm font-medium text-center">Hours</div>
                            {weekDays.map((day, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        'p-3 text-sm font-medium text-center',
                                        format(new Date(), 'yyyy-MM-dd') === day.fullDate ? 'bg-primaryColor/80' : ''
                                    )}
                                >
                                    <span>{day.dayName}</span> <span>{day.dayNum}</span>
                                </div>
                            ))}
                            <div className="p-3 text-sm font-medium text-center">Actions</div>
                        </div>

                        {rows.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className={cn(
                                    'grid grid-cols-[1fr,100px,repeat(7,1fr),70px] border-b',
                                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-muted/20'
                                )}
                            >
                                <div className="p-2 border-r">
                                    <Select value={row.project || undefined}>
                                        <SelectTrigger className="w-full border-0 shadow-none focus:ring-0 h-9">
                                            <SelectValue placeholder="Select Project" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Project 1">Project 1</SelectItem>
                                            <SelectItem value="Project 2">Project 2</SelectItem>
                                            <SelectItem value="Project 3">Project 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="p-2 border-r bg-muted/30 flex flex-col items-center justify-center">
                                    <div className="text-center text-sm font-medium">Total: {formatHoursDisplay(row.hours.total)}</div>
                                    <div className="flex gap-1 items-center">
                                        {row.hours.total > 40 && (
                                            <ToolTip content="Exceeds weekly limit of 40 hours">
                                                <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                                            </ToolTip>
                                        )}
                                    </div>
                                </div>

                                {weekDays.map((day, dayIndex) => {
                                    const dayTotalHours = rows.reduce((sum, r) => sum + (r.hours.daily[dayIndex] || 0), 0);
                                    const isOverLimit = dayTotalHours > MAX_DAILY_HOURS;

                                    return (
                                        <div
                                            key={dayIndex}
                                            className={cn(
                                                'p-2 border-r flex flex-col gap-2',
                                                format(new Date(), 'yyyy-MM-dd') === day.fullDate ? 'bg-muted/30' : '',
                                                isOverLimit ? 'bg-red-50' : ''
                                            )}
                                        >
                                            <div className="relative">
                                                <div className="relative">
                                                    <div className="flex">
                                                        <Input
                                                            placeholder="HH"
                                                            min="0"
                                                            max="23"
                                                            value={row.entries[dayIndex].time?.split(':')[0] || ''}
                                                            onChange={(e) => {
                                                                const hours = e.target.value.padStart(2, '0');
                                                                const minutes = row.entries[dayIndex].time?.split(':')[1] || '00';
                                                                const newValue = `${hours}:${minutes}`;
                                                                handleTimeChange(rowIndex, dayIndex, newValue);
                                                            }}
                                                            className="w-1/2 p-2 border rounded-l text-center text-sm focus:border-primaryColor focus:ring-1 focus:ring-primaryColor focus:outline-none"
                                                        />
                                                        <span className="flex items-center px-1 border-t border-b">:</span>
                                                        <Input
                                                            placeholder="MM"
                                                            min="0"
                                                            max="59"
                                                            value={row.entries[dayIndex].time?.split(':')[1] || ''}
                                                            onChange={(e) => {
                                                                const minutes = e.target.value.padStart(2, '0');
                                                                const hours = row.entries[dayIndex].time?.split(':')[0] || '00';
                                                                const newValue = `${hours}:${minutes}`;
                                                                handleTimeChange(rowIndex, dayIndex, newValue);
                                                            }}
                                                            className="w-1/2 p-2 border rounded-r text-center text-sm focus:border-primaryColor focus:ring-1 focus:ring-primaryColor focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <Select
                                                value={row.entries[dayIndex].task || undefined}
                                                onValueChange={(value) => handleTaskChange(rowIndex, dayIndex, value)}
                                            >
                                                <SelectTrigger className="w-full text-sm h-8">
                                                    <SelectValue placeholder="Task" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="task1">Task 1</SelectItem>
                                                    <SelectItem value="task2">Task 2</SelectItem>
                                                    <SelectItem value="task3">Task 3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Select
                                                value={row.entries[dayIndex].subtask || undefined}
                                                onValueChange={(value) => handleSubtaskChange(rowIndex, dayIndex, value)}
                                            >
                                                <SelectTrigger className="w-full text-sm h-8">
                                                    <SelectValue placeholder="SubTask" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="subtask1">SubTask 1</SelectItem>
                                                    <SelectItem value="subtask2">SubTask 2</SelectItem>
                                                    <SelectItem value="subtask3">SubTask 3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {isOverLimit && (
                                                <div className="text-xs text-red-500 flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    <span>Max {MAX_DAILY_HOURS}h/day</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                <div className="p-2 flex items-center justify-center">
                                    <div className="flex flex-col space-y-1">
                                        <ToolTip content="Reset Entry" side="left">
                                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                                <RefreshCw className="h-3.5 w-3.5 text-primaryColor" />
                                            </Button>
                                        </ToolTip>
                                        <ToolTip content="Undo Changes" side="left">
                                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                                <RotateCcw className="h-3.5 w-3.5 text-primaryColor" />
                                            </Button>
                                        </ToolTip>
                                        <ToolTip content="Delete Row" side="left">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7"
                                                onClick={() => handleDeleteRow(row.id)}
                                                disabled={rows.length <= 1}
                                            >
                                                <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                            </Button>
                                        </ToolTip>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-4">
                    <div className="flex space-x-2">
                        <Button onClick={handleAddRow} variant="default" size="sm" className="flex items-center gap-1">
                            <span>+</span> Add Row
                        </Button>
                        <ToolTip content="Copy data from previous week">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <Copy className="h-4 w-4" /> Clone Previous Week
                            </Button>
                        </ToolTip>
                    </div>

                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                            Cancel
                        </Button>
                        <Button variant="default" size="sm" className="flex items-center gap-1 text-sm font-light">
                            <CheckCircle2 className="h-4 w-4" /> Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
