import { Request, Response, NextFunction } from 'express';
import { AppError } from '../core/errors/AppError';
import { Prisma } from '@prisma/client';

/**
 * Global error handler middleware.
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(400).json({
        error: 'O e-mail informado já está sendo utilizado por outro usuário.',
      });
    }
  }

  console.error('[Unhandled Error]', err);
  return res.status(500).json({ error: 'Erro interno do servidor.' });
}
