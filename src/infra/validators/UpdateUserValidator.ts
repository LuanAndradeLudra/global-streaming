import { z } from 'zod';

/**
 * Schema to validate user settings update payload.
 */
export const UpdateUserSettingsSchema = z.object({
  twitchChannel: z.string().nonempty('Twitch channel is required'),
  kickChannel: z.string().nonempty('Kick channel is required'),
});

export type UpdateUserSettingsDto = z.infer<typeof UpdateUserSettingsSchema>;
