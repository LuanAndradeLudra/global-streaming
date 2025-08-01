import { ZodObject, ZodRawShape } from 'zod';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to validate route parameters against a Zod schema.
 */
export function validateParams(schema: ZodObject<ZodRawShape>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    req.params = result.data as import('express-serve-static-core').ParamsDictionary;
    next();
  };
}
