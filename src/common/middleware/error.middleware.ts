import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { logger } from '../logger/logger';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors || null,
    });
  }
  
  const isDevelopment = process.env.NODE_ENV === 'development';

  logger.error({ 
    err,
    message: err.message,
    statusCode: err.statusCode || 500,
    stack: isDevelopment ? err.stack : undefined 
  });

  return res.status(500).json({
    message: 'Internal Server Error',
    errors: null,
  });
};
