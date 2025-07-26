import { prisma } from '../../../../lib/prisma/prisma';
import { UserRepository } from '../UserRepository';
import { RegisterUserDto } from '../../../../core/dto/auth/RegisterUserDto';

describe('UserRepository', () => {
  const repo = new UserRepository();

  beforeAll(async () => {
    // first remove dependent settings, then users
    await prisma.userSettings.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const userData: RegisterUserDto = {
    name: 'Repo Test',
    email: 'repo@example.com',
    password: 'hashed_password',
  };

  let created: any;

  it('should create and find a user by email', async () => {
    created = await repo.create(userData);
    expect(created).toHaveProperty('id');
    expect(created.email).toBe(userData.email);

    const found = await repo.findByEmail(userData.email);
    expect(found?.id).toBe(created.id);
  });

  it('should find all users', async () => {
    const all = await repo.findAll();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
  });

  it('should find a user by ID', async () => {
    const found = await repo.findById(created.id);
    expect(found?.email).toBe(userData.email);
  });

  it('should update a user', async () => {
    const updated = await repo.update(created.id, { name: 'Updated Repo' });
    expect(updated.name).toBe('Updated Repo');
  });

  it('should delete a user', async () => {
    await repo.delete(created.id);
    const deleted = await repo.findById(created.id);
    expect(deleted).toBeNull();
  });
});