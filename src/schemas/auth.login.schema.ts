import { z } from 'zod';
export const AuthLogInSchema = z.object({
    username: z.string().min(1, { message: 'Invalid User Name' }),
    password: z.string().min(1, { message: 'Password Required' }),
});
