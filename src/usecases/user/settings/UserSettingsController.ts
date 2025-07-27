import { Request, Response } from 'express';
import { UserSettingsManager } from './UserSettingsManager';
import { UserSettingsDto } from '../../../core/dto/user/UserDto';
import { UpdateUserSettingsDto } from '../../../infra/validators/UpdateUserValidator';

export class UserSettingsController {
  private settingsManager = new UserSettingsManager();

 /** PUT /api/users/me/settings */
 updateOwnSettings = async (
  req: Request<{}, {}, UpdateUserSettingsDto>,
  res: Response
) => {
  try {
    const userId = req.user.id;
    const { twitchChannel, kickChannel } = req.body;

    const settings = await this.settingsManager.upsertByUserId(userId, {
      userId:       userId,
      twitchChannel: twitchChannel,
      kickChannel:   kickChannel,
    });

    return res.json(settings);
  } catch (err: any) {
    // if you want to catch validation errors or Prisma errors:
    return res
      .status(400)
      .json({ error: err.message ?? 'Failed to update settings' });
  }
};
}
