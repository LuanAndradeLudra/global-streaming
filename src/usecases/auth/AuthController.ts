// src/usecases/auth/AuthController.ts
import { Request, Response } from 'express';
import { AuthManager } from './AuthManager';
import { UserManager } from '../user/UserManager';

const authManager = new AuthManager(new UserManager());

export class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const result = await authManager.register(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const result = await authManager.login(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  };
}
