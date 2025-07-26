import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Singleton para evitar múltiplas instâncias no desenvolvimento
export const prisma = global.prisma ?? new PrismaClient();

