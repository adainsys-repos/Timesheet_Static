import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Switch } from '../ui/switch';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

// Schema Validation
export const ConfigureSchema = z.object({
    allowFutureDates: z.boolean(),
    allowPastDates: z.boolean(),
    minimumHoursPerDay: z.string().min(1, 'Required'),
    maximumHoursPerDay: z.string().min(1, 'Required'),
    enableOvertime: z.boolean(),
    startDate: z.string(),
    endDate: z.string(),
    allowWeekends: z.boolean(),
    notificationTrigger: z.string(),
});

export default function ConfigurationForm() {
    // Initialize Form with react-hook-form
    const form = useForm<z.infer<typeof ConfigureSchema>>({
        resolver: zodResolver(ConfigureSchema),
        defaultValues: {
            allowFutureDates: false,
            allowPastDates: false,
            minimumHoursPerDay: '',
            maximumHoursPerDay: '',
            enableOvertime: false,
            startDate: '',
            endDate: '',
            allowWeekends: false,
            notificationTrigger: '70%',
        },
    });

    const onSubmit = (data: z.infer<typeof ConfigureSchema>) => {
        console.log('Submitted Data:', data);
    };

    return (
        <div className="flex items-start justify-center min-h-screen bg-gray-50 overflow-auto pt-6">
            <Card className="w-full max-w-[900px] pt-8 pl-4 shadow-md rounded-xl bg-white">
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="overflow-auto">
                            {/* First Row */}
                            <div className="grid grid-cols-2 gap-6 mb-4">
                                <FormField
                                    control={form.control}
                                    name="allowFutureDates"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Label className="text-gray-700 w-1/2">Allow Future Dates</Label>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="minimumHoursPerDay"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Label className="text-gray-700 w-1/2">Minimum Hours per Day</Label>
                                                    <Input {...field} className="w-[200px]" />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Second Row */}
                            <div className="grid grid-cols-2 gap-6 mb-4">
                                <FormField
                                    control={form.control}
                                    name="allowPastDates"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Label className="text-gray-700 w-1/2">Allow Past Dates</Label>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="maximumHoursPerDay"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Label className="text-gray-700 w-1/2">Maximum Hours per Day</Label>
                                                    <Input {...field} className="w-[200px]" />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Third Row */}
                            <div className="grid grid-cols-2 gap-6 mb-4">
                                <FormField
                                    control={form.control}
                                    name="enableOvertime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Label className="text-gray-700 w-1/2">Enable Overtime</Label>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Label className="text-gray-700 w-1/2">Start Date</Label>
                                                    <Input {...field} placeholder="dd / mm / yyyy" className="w-[200px]" />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Fourth Row */}
                            <div className="grid grid-cols-2 gap-6 mb-4">
                                <FormField
                                    control={form.control}
                                    name="allowWeekends"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Label className="text-gray-700 w-1/2">Allow Weekends</Label>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Label className="text-gray-700 w-1/2">End Date</Label>
                                                    <Input {...field} placeholder="dd / mm / yyyy" className="w-[200px]" />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Notification Trigger */}
                            <FormField
                                control={form.control}
                                name="notificationTrigger"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center mb-6">
                                                <Label className="text-gray-700 w-1/4">Notification Trigger</Label>
                                                <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-4">
                                                    <div className="flex items-center">
                                                        <RadioGroupItem value="70%" />
                                                        <Label className="ml-2">70%</Label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <RadioGroupItem value="80%" />
                                                        <Label className="ml-2">80%</Label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <RadioGroupItem value="90%" />
                                                        <Label className="ml-2">90% or more</Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button type="submit" className="mt-4">
                                Save
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
