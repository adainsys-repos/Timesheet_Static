import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/icons/icons';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema for Form Validation using Zod
const AddEmployeeSchema = z.object({
    employeeId: z.string().min(1, 'Employee ID is required'),
});

type AddEmployeeFormData = z.infer<typeof AddEmployeeSchema>;

export default function AddEmployees() {
    const form = useForm<AddEmployeeFormData>({
        resolver: zodResolver(AddEmployeeSchema),
        defaultValues: {
            employeeId: '',
        },
    });

    const onSubmit = (data: AddEmployeeFormData) => {
        console.log('Employee Data:', data);
        alert('Employee added successfully!');
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Add Employee</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Employee ID */}
                    <FormField
                        control={form.control}
                        name="employeeId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Employee ID" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" className="flex items-center gap-2">
                        <Icons.plus className="size-4" /> Add Employee
                    </Button>
                </form>
            </Form>
        </div>
    );
}
