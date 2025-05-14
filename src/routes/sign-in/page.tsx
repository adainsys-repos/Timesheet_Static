import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthLogInSchema } from '@/schemas/auth.login.schema';
import { Separator } from '@/components/ui/separator';
import { Icons } from '@/icons/icons';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/controllers/auth/auth.mutation';
import { axiosInstance } from '@/utils/instance';
import { setCookie } from '@/utils/cookies';
import { cookieNameSpace } from '@/utils/cookies';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const form = useForm<z.infer<typeof AuthLogInSchema>>({
        resolver: zodResolver(AuthLogInSchema),
        defaultValues: { username: '', password: '' },
    });

    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: { username: string; password: string }) => await login(data),
        onSuccess: (res) => {
            console.log('Success:', res);
            if (res && typeof res === 'object' && 'token' in res) {
                const token = res.token as string;
                setCookie({ name: cookieNameSpace.auth.token, value: token });
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                navigate('/');
            } else {
                console.error('Invalid response format:', res);
            }
        },
        onError: (error) => {
            console.log('Error:', error);
        },
    });

    const onSubmit = (data: z.infer<typeof AuthLogInSchema>) => {
        mutate(data);
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl border border-gray-100">
                <div className="flex flex-col items-center mb-8">
                    <img src="/logo.png" alt="Logo" className="h-12 mb-6" />
                    <h2 className="text-2xl font-bold text-primaryColor">LOGIN</h2>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">
                                            <Icons.user className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                            <Input
                                                {...field}
                                                placeholder="Username"
                                                type="text"
                                                className="pl-10 py-3 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-sm text-red-500 mt-1" />
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
                                            <Icons.lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                            <Input
                                                {...field}
                                                placeholder="Password"
                                                type="password"
                                                className="pl-10 py-3 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-sm text-red-500 mt-1" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="bg-primaryColor hover:bg-opacity-90 text-white font-medium w-full py-3 rounded-lg transition flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <Icons.spinner className="animate-spin" size={18} />
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    Sign In
                                    <Icons.arrowRight size={18} />
                                </div>
                            )}
                        </Button>

                        <div className="flex items-center justify-center gap-2">
                            <Separator className="w-40" />
                            <p className="text-center text-sm text-gray-500">OR</p>
                            <Separator className="w-40" />
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <Button
                                type="button"
                                className="bg-secondaryColor hover:bg-opacity-90 text-white font-medium w-full py-3 rounded-lg transition flex items-center justify-center gap-2"
                            >
                                Login via Single Sign-On <Icons.arrowRight size={18} />
                            </Button>
                        </div>

                        <div className="text-center mt-4">
                            <a href="#" className="text-sm text-primaryColor hover:underline">
                                Forgot your password?
                            </a>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
