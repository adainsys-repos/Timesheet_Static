import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type AddCustomerSchema = {
    customerName: string;
    contactPerson: string;
    email: string;
    phoneNumber: string;
    address: string;
};

const AddCustomer = () => {
    const form = useForm<AddCustomerSchema>({
        defaultValues: {
            customerName: '',
            contactPerson: '',
            email: '',
            phoneNumber: '',
            address: '',
        },
    });

    const onSubmit = (data: AddCustomerSchema) => {
        console.log('Customer Data:', data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
                {/* Customer Name */}
                <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Enter Customer Name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Contact Person */}
                <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Enter Contact Person Name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Enter Email Address" type="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Phone Number */}
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Enter Phone Number" type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Address */}
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Enter Address" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default AddCustomer;
