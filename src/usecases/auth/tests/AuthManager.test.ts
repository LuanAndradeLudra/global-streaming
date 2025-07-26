import { AuthManager } from '../AuthManager';
import { UserManager } from '../../user/UserManager';
import { AppError } from '../../../core/errors/AppError';
import { RegisterUserDto } from '../../../core/dto/auth/RegisterUserDto';
import { LoginUserDto } from '../../../core/dto/auth/LoginUserDto';

jest.mock('../../user/UserManager');

const MockedUserManager = UserManager as jest.MockedClass<typeof UserManager>;

describe('AuthManager', () => {
  let authManager: AuthManager;
  let userManager: jest.Mocked<UserManager>;

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret';
    userManager = new MockedUserManager() as jest.Mocked<UserManager>;
    authManager = new AuthManager(userManager);
  });

  describe('register', () => {
    it('should register a new user and return a token', async () => {
      userManager.findByEmail.mockResolvedValue(null);
      userManager.create.mockResolvedValue({
        id: 1,
        name: 'John',
        email: 'john@example.com',
        password: 'hashed_password',
      });

      const data: RegisterUserDto = {
        name: 'John',
        email: 'john@example.com',
        password: '12345678',
      };

      const result = await authManager.register(data);
      expect(result).toHaveProperty('token');
    });

    it('should throw if email already exists', async () => {
      userManager.findByEmail.mockResolvedValue({
        id: 1,
        name: 'Existing',
        email: 'john@example.com',
        password: 'hashed_password',
      });

      await expect(
        authManager.register({
          name: 'John',
          email: 'john@example.com',
          password: '12345678',
        }),
      ).rejects.toThrow(AppError);
    });
  });

  describe('login', () => {
    it('should login and return token', async () => {
      userManager.findByEmail.mockResolvedValue({
        id: 1,
        name: 'John',
        email: 'john@example.com',
        password: await require('bcrypt').hash('12345678', 10),
      });

      const data: LoginUserDto = {
        email: 'john@example.com',
        password: '12345678',
      };

      const result = await authManager.login(data);
      expect(result).toHaveProperty('token');
    });

    it('should fail with wrong password', async () => {
      userManager.findByEmail.mockResolvedValue({
        id: 1,
        name: 'John',
        email: 'john@example.com',
        password: await require('bcrypt').hash('rightpass', 10),
      });

      const data: LoginUserDto = {
        email: 'john@example.com',
        password: 'wrongpass',
      };

      await expect(authManager.login(data)).rejects.toThrow('Credenciais inválidas.');
    });

    it('should fail if user not found', async () => {
      userManager.findByEmail.mockResolvedValue(null);

      const data: LoginUserDto = {
        email: 'john@example.com',
        password: 'whatever',
      };

      await expect(authManager.login(data)).rejects.toThrow('Credenciais inválidas.');
    });
  });
});
