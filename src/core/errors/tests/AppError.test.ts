import { AppError } from '../AppError';

describe('AppError', () => {
  it('should create an error with default status code', () => {
    const error = new AppError('Something went wrong');
    expect(error.message).toBe('Something went wrong');
    expect(error.statusCode).toBe(400);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
  });

  it('should create an error with custom status code', () => {
    const error = new AppError('Unauthorized', 401);
    expect(error.message).toBe('Unauthorized');
    expect(error.statusCode).toBe(401);
  });
});
