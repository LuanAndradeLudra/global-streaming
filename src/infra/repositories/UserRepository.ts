import { PrismaClient, User } from '@prisma/client';
import { IDatabaseRepository } from '../../core/interfaces/repositories/IDatabaseRepository';
import { RegisterUserDto } from '../../core/dto/auth/RegisterUserDto';

const prisma = new PrismaClient();

/**
 * Repository for User model operations.
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
    return prisma.user.findUnique({ where: { email } });
  }
}
