export class AppError extends Error {
  public statusCode: number;
  public errors?: any;
  public isOperational: boolean;

  constructor(args: { message: string, statusCode: number, errors?: any }) {
    super(args.message);
    this.statusCode = args.statusCode;
    this.errors = args.errors;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
