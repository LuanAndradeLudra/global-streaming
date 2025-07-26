// src/usecases/user/__tests__/UserManager.test.ts
import { UserManager } from '../UserManager';
import { UserRepository } from '../../../infra/repositories/user/UserRepository';
import { RegisterUserDto } from '../../../core/dto/auth/RegisterUserDto';
import { User } from '@prisma/client';

describe('UserManager', () => {
  let userManager: UserManager;
  let repository: jest.Mocked<UserRepository>;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed_password',
  };

  beforeEach(() => {
    userManager = new UserManager();
    // @ts-ignore — acessa a propriedade privada para mock
    repository = userManager['repository'] as jest.Mocked<UserRepository>;
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const dto: RegisterUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'securepass',
      };

      jest.spyOn(repository, 'create').mockResolvedValue(mockUser);

      const result = await userManager.create(dto);

      expect(result).toEqual(mockUser);
      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findByEmail', () => {
    it('should return user if found', async () => {
      jest.spyOn(repository, 'findByEmail').mockResolvedValue(mockUser);

      const result = await userManager.findByEmail('john@example.com');

      expect(result).toEqual(mockUser);
      expect(repository.findByEmail).toHaveBeenCalledWith('john@example.com');
    });

    it('should return null if user not found', async () => {
      jest.spyOn(repository, 'findByEmail').mockResolvedValue(null);

      const result = await userManager.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
      expect(repository.findByEmail).toHaveBeenCalledWith('nonexistent@example.com');
    });
  });

  describe('findById', () => {
    it('should return user if found by id', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(mockUser);

      const result = await userManager.findById(1);

      expect(result).toEqual(mockUser);
      expect(repository.findById).toHaveBeenCalledWith(1);
    });

    it('should return null if user not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      const result = await userManager.findById(999);

      expect(result).toBeNull();
      expect(repository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([mockUser]);

      const result = await userManager.findAll();

      expect(result).toEqual([mockUser]);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updatedUser: User = { ...mockUser, name: 'Updated' };
      jest.spyOn(repository, 'update').mockResolvedValue(updatedUser);

      const result = await userManager.update(1, { name: 'Updated' });

      expect(result).toEqual(updatedUser);
      expect(repository.update).toHaveBeenCalledWith(1, { name: 'Updated' });
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const spy = jest.spyOn(repository, 'delete').mockResolvedValue();

      await userManager.delete(1);

      expect(spy).toHaveBeenCalledWith(1);
    });
  });
});
