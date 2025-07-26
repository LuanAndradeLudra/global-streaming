/**
 * Custom application error for standardized error handling.
 */
export class AppError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode = 400) {
      super(message);
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  