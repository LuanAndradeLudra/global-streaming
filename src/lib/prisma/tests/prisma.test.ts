import { PrismaClient } from '@prisma/client';

describe('lib/prisma', () => {
  afterEach(() => {
    delete (global as any).prisma;
    jest.resetModules();
  });

  it('should reuse global.prisma if already defined', async () => {
    const fakeClient = new PrismaClient();
    (global as any).prisma = fakeClient;

    const { prisma } = await import('../prisma');
    expect(prisma).toBe(fakeClient);
  });
});
