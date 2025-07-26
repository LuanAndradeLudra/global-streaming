import { z } from 'zod';

/**
 * Schema to validate user registration payload.
 */
export const RegisterUserSchema = z.strictObject({
  name: z.string().nonempty('Name is required'),
  email: z.email('Invalid email'),
  password: z.string().nonempty('Password is required').min(8, 'Password must be at least 8 characters'),
});

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;
