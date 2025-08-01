import { z } from 'zod';

/**
 * Schema to validate verifyLive route params.
 */
export const VerifyLiveParamsSchema = z.object({
  type: z.string(),
  channel: z.string().min(1, 'Channel name is required'),
});

export type VerifyLiveParamsDto = z.infer<typeof VerifyLiveParamsSchema>;
