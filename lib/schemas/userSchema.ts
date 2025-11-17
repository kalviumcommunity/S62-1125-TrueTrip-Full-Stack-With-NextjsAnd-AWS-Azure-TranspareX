import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name must be less than 50 characters'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username must be less than 30 characters'),
  email: z.string()
    .email('Invalid email address')
    .min(5, 'Email must be at least 5 characters long')
    .max(100, 'Email must be less than 100 characters'),
  role: z.enum(['USER', 'ADMIN', 'GUIDE']).default('USER'),
});

export const userUpdateSchema = userSchema.partial();

export type UserInput = z.infer<typeof userSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;