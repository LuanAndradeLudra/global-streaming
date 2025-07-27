import { Request, Response } from 'express';
import { UserSettingsManager } from './UserSettingsManager';
import { UpdateUserSettingsDto } from '../../../core/dto/user/settings/UpdateUserSettingsDto';

export class UserSettingsController {
  private settingsManager = new UserSettingsManager();

  /** PUT /api/users/me/settings */
  updateOwnSettings = async (
    req: Request<{}, {}, UpdateUserSettingsDto>,
    res: Response
  ) => {
    const userId = req.user.id;
    const data = req.body;
    const settings = await this.settingsManager.upsertByUserId(userId, data);
    res.json(settings);
  };
}
