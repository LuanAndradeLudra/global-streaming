import { prisma } from '../../../../lib/prisma/prisma';
import { UserRepository } from '../UserRepository';
import { RegisterUserDto } from '../../../../core/dto/auth/RegisterUserDto';

describe('UserRepository', () => {
  const repo = new UserRepository();

  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create and find a user by email', async () => {
    const data: RegisterUserDto = {
      name: 'Repo Test',
      email: 'repo@example.com',
      password: 'hashed_password',
    };

    const created = await repo.create(data);
    expect(created).toHaveProperty('id');
    expect(created.email).toBe('repo@example.com');

    const found = await repo.findByEmail('repo@example.com');
    expect(found?.id).toBe(created.id);
  });

  it('should find all users', async () => {
    const all = await repo.findAll();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
  });

  it('should find a user by ID', async () => {
    const user = await repo.findByEmail('repo@example.com');
    expect(user).not.toBeNull();

    const found = await repo.findById(user!.id);
    expect(found?.email).toBe('repo@example.com');
  });

  it('should update a user', async () => {
    const user = await repo.findByEmail('repo@example.com');
    const updated = await repo.update(user!.id, { name: 'Updated Repo' });

    expect(updated.name).toBe('Updated Repo');
  });

  it('should delete a user', async () => {
    const user = await repo.findByEmail('repo@example.com');
    await repo.delete(user!.id);

    const deleted = await repo.findById(user!.id);
    expect(deleted).toBeNull();
  });
});
