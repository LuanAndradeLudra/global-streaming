import { z } from 'zod';

/**
 * Schema to validate user settings update payload.
 */
export const UpdateUserSettingsSchema = z.object({
  twitch_channel: z.string().nonempty('Twitch channel is required'),
  kick_channel: z.string().nonempty('Kick channel is required'),
});

export type UpdateUserSettingsDto = z.infer<typeof UpdateUserSettingsSchema>;
