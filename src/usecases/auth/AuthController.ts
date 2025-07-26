import { Request, Response } from 'express';
import { AuthManager } from './AuthManager';
import { RegisterUserDto } from '../../core/dto/auth/RegisterUserDto';
import { LoginUserDto } from '../../core/dto/auth/LoginUserDto';

/**
 * Controller to handle authentication routes.
 */
export class AuthController {
  private manager = new AuthManager();

  register = async (req: Request<{}, {}, RegisterUserDto>, res: Response) => {
    try {
      const result = await this.manager.register(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  };

  login = async (req: Request<{}, {}, LoginUserDto>, res: Response) => {
    try {
      const result = await this.manager.login(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  };
}
