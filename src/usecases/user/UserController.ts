import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserManager } from './UserManager';
import { UserSettingsManager } from './settings/UserSettingsManager';
import { UserDto } from '../../core/dto/user/UserDto';

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
      return res.json({ user: safeUser as UserDto, settings: null });
    }
    const { userId: _, ...safeSettings } = rawSettings;
    res.json({ user: safeUser as UserDto, settings: safeSettings });
  };

  /** PUT /api/users/me */
  updateMe = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    // Build update payload
    const updateData: Partial<{ name: string; email: string; password: string }> = { name, email };
    if (password) {
      // Hash new password
      updateData.password = await bcrypt.hash(password, 10);
    }

    try {
      const updatedUser = await this.manager.update(userId, updateData);
      const { password: _, ...safeUser } = updatedUser;
      res.json(safeUser as UserDto);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  /** GET /api/users/:id */
  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await this.manager.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { password, ...safeUser } = user;
    res.json(safeUser as UserDto);
  };
}
