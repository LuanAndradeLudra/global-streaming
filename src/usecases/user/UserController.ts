import { Request, Response } from 'express';
import { UserManager } from './UserManager';
import { UserSettingsManager } from './settings/UserSettingsManager';
import { UserResponseDto } from '../../core/dto/user/UserResponseDto';

/**
 * Controller responsible for handling user-related HTTP requests.
 */
export class UserController {
  private manager = new UserManager();
  private settingsManager = new UserSettingsManager();

  /** GET /api/users/me */
  getMe = async (req: Request, res: Response) => {
    const userId = req.user.id;

    const user = await this.manager.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...safeUser } = user;

    const rawSettings = await this.settingsManager.findByUserId(userId);
    if (!rawSettings) {
      return res.json({ user: safeUser as UserResponseDto, settings: null });
    }

    const { userId: _, ...safeSettings } = rawSettings;

    return res.json({
      user: safeUser as UserResponseDto,
      settings: safeSettings,
    });
  };

  /** GET /api/users/:id */
  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await this.manager.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { password, ...safeUser } = user;
    res.json(safeUser as UserResponseDto);
  };
}
