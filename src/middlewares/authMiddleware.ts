// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token ausente ou inválido' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
    // Se for string, falhou; ou não tiver nosso campo userId
    if (typeof decoded === 'string' || typeof decoded.userId !== 'number') {
      return res.status(401).json({ error: 'Token inválido' });
    }

    // Preenche o req.user com o formato que você definiu
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
