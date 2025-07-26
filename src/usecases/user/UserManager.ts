import { User } from '@prisma/client';
import { IDatabaseManager } from '../../core/interfaces/managers/IDatabaseManager';
import { RegisterUserDto } from '../../core/dto/auth/RegisterUserDto';
import { UserRepository } from '../../infra/repositories/UserRepository';

/**
 * Manager responsible for user-related logic and persistence delegation.
 */
export class UserManager implements IDatabaseManager<User, RegisterUserDto> {
  private repository = new UserRepository();

  async findById(id: number): Promise<User | null> {
    return this.repository.findById(id);
  }

  async findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async create(data: RegisterUserDto): Promise<User> {
    return this.repository.create(data);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }
}
