import { Request, Response } from 'express';
import { UserManager } from './UserManager';
import { RegisterUserDto } from '../../infra/validators/RegisterUserDto';
import { LoginUserDto } from '../../infra/validators/loginUserValidator';

/**
 * Controller responsible for handling user-related HTTP requests.
 */
export class UserController {
  private manager = new UserManager();

  /**
   * Handles user registration request.
   * @param req Express request containing RegisterUserDto
   * @param res Express response
   */
  register = async (req: Request, res: Response) => {
    const payload: RegisterUserDto = req.body;

    try {
      const token = await this.manager.register(payload);
      res.json({ token });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  /**
   * Handles user login request.
   * @param req Express request containing LoginUserDto
   * @param res Express response
   */
  login = async (req: Request, res: Response) => {
    const payload: LoginUserDto = req.body;

    try {
      const token = await this.manager.login(payload);
      res.json({ token });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  };
}
