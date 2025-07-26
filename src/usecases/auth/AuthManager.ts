import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IAuthManager } from '../../core/interfaces/managers/IAuthManager';
import { RegisterUserDto } from '../../core/dto/auth/RegisterUserDto';
import { LoginUserDto } from '../../core/dto/auth/LoginUserDto';
import { AuthResponseDto } from '../../core/dto/auth/AuthResponseDto';
import { UserManager } from '../user/UserManager';
import { AppError } from '../../core/errors/AppError';

const JWT_SECRET = process.env.JWT_SECRET!;

/**
 * Handles user authentication logic such as login and registration.
 */
export class AuthManager implements IAuthManager {
  private userManager = new UserManager();

  async register(data: RegisterUserDto): Promise<AuthResponseDto> {
    const existing = await this.userManager.findByEmail(data.email);
    if (existing) {
      throw new AppError('E-mail já está em uso.', 409);
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await this.userManager.create({
      name: data.name,
      email: data.email,
      password: hashed,
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return { token };
  }

  async login(data: LoginUserDto): Promise<AuthResponseDto> {
    const user = await this.userManager.findByEmail(data.email);
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new AppError('Credenciais inválidas.', 401);
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return { token };
  }
}
