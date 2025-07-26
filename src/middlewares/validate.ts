import { ZodObject, ZodRawShape } from 'zod';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to validate request bodies against a Zod schema.
 */
export function validate(schema: ZodObject<ZodRawShape>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    req.body = result.data;
    next();
  };
}
