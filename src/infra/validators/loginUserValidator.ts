import { z } from 'zod';

/**
 * Schema to validate user login payload.
 */
export const LoginUserSchema = z.strictObject({
  email: z.email('Invalid email'),
  password: z.string().nonempty('Password is required').min(8, 'Password must be at least 8 characters'),
});

export type LoginUserDto = z.infer<typeof LoginUserSchema>;
