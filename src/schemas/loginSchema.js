import * as z from 'zod';
const loginSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .nonempty({ message: 'Email is required' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(50, { message: 'Password must not exceed 50 characters' })
        .nonempty({ message: 'Password is required' }),
});

export default loginSchema;
