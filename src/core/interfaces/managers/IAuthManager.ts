import { RegisterUserDto } from '../../dto/auth/RegisterUserDto';
import { LoginUserDto } from '../../dto/auth/LoginUserDto';
import { AuthResponseDto } from '../../dto/auth/AuthResponseDto';

/**
 * Interface that defines authentication use cases.
 */
export interface IAuthManager {
  /**
   * Registers a new user.
   * @param data User registration data.
   * @returns JWT token.
   */
  register(data: RegisterUserDto): Promise<AuthResponseDto>;

  /**
   * Authenticates a user.
   * @param data Login credentials.
   * @returns JWT token.
   */
  login(data: LoginUserDto): Promise<AuthResponseDto>;
}
