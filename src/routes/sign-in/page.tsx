import React from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User, Lock, ArrowRightCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthLogInSchema } from '@/schemas/auth.login.schema';

const LoginPage = () => {
    const form = useForm<z.infer<typeof AuthLogInSchema>>({
        resolver: zodResolver(AuthLogInSchema),
        defaultValues: { username: '', password: '' },
    });

    const onSubmit = (data: z.infer<typeof AuthLogInSchema>) => {
        console.log('Form Submitted', data);
    };

    return (
        <div className="flex min-h-screen w-full">
            <div className="flex items-center justify-center w-2/5 bg-gray-100">
                <div className="flex flex-col items-center">
                    <img src="/logo.png" alt="Logo" className="max-h-8 mb-4" />

                    <div className="w-full max-w-xs p-10 bg-white shadow-md rounded-xl border border-gray-200">
                        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">LOGIN</h2>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <Input
                                                        {...field}
                                                        placeholder="Username"
                                                        type="text"
                                                        className="pl-10 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <Input
                                                        {...field}
                                                        placeholder="Password"
                                                        type="password"
                                                        className="pl-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="bg-blue-600 text-white text-sm w-full py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                                >
                                    Next <ArrowRightCircle size={16} />
                                </Button>

                                <div className="relative flex items-center my-3">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="mx-2 text-gray-400 text-sm">OR</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>

                                <Button
                                    type="button"
                                    className="bg-blue-600 text-white text-sm w-full py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                                >
                                    Login via Single Sign-On <ArrowRightCircle size={16} />
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>

            <div className="w-3/5 bg-gray-100 flex items-center justify-center"></div>
        </div>
    );
};

export default LoginPage;
