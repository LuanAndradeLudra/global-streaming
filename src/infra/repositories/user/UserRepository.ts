import { User } from '@prisma/client';
import { prisma } from '../../../lib/prisma/prisma';
import { IDatabaseRepository } from '../../../core/interfaces/repositories/IDatabaseRepository';
import { RegisterUserDto } from '../../../core/dto/auth/RegisterUserDto';

/**
 * Repository implementation for managing User data with Prisma.
 */
export class UserRepository implements IDatabaseRepository<User, RegisterUserDto> {
  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async create(data: RegisterUserDto): Promise<User> {
    return prisma.user.create({ data });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { email } });
  }
}
