// src/usecases/auth/AuthManager.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IAuthManager } from '../../core/interfaces/managers/IAuthManager';
import { UserManager } from '../user/UserManager';
import { AppError } from '../../core/errors/AppError';
import { LoginUserDto } from '../../core/dto/auth/LoginUserDto';
import { RegisterUserDto } from '../../core/dto/auth/RegisterUserDto';
import { AuthResponseDto } from '../../core/dto/auth/AuthResponseDto';

/**
 * Handles user authentication logic such as login and registration.
 */
export class AuthManager implements IAuthManager {
  constructor(private readonly userManager: UserManager) {}

  async register(data: RegisterUserDto): Promise<AuthResponseDto> {
    const existing = await this.userManager.findByEmail(data.email);
    if (existing) {
      throw new AppError('E-mail já está em uso.', 400);
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await this.userManager.create({
      ...data,
      password: hashed,
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    return { token };
  }

  async login(data: LoginUserDto): Promise<AuthResponseDto> {
    const user = await this.userManager.findByEmail(data.email);
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new AppError('Credenciais inválidas.', 401);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    return { token };
  }
}
