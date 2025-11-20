import { ZodError } from 'zod';
import { NextResponse } from 'next/server';
import { ApiResponseHandler } from './validations/api-response';

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string = 'Validation failed',
    public errors: any[] = []
  ) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND_ERROR');
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists') {
    super(message, 409, 'CONFLICT_ERROR');
    this.name = 'ConflictError';
  }
}

export function handleError(error: unknown): NextResponse {
  console.error('Error handled:', error);

  if (error instanceof ZodError) {
    const validationErrors = error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return ApiResponseHandler.validationError(validationErrors);
  }

  if (error instanceof AppError) {
    return ApiResponseHandler.error(error.message, error.statusCode);
  }

  if (error instanceof Error) {
    // Handle specific common errors
    if (error.name === 'PrismaClientKnownRequestError') {
      // @ts-ignore
      if (error.code === 'P2002') {
        return ApiResponseHandler.conflict('A resource with this data already exists');
      }
      // @ts-ignore
      if (error.code === 'P2025') {
        return ApiResponseHandler.notFound('Resource not found');
      }
    }

    if (error.name === 'JsonWebTokenError') {
      return ApiResponseHandler.unauthorized('Invalid token');
    }

    if (error.name === 'TokenExpiredError') {
      return ApiResponseHandler.unauthorized('Token expired');
    }
  }

  // Generic error for unhandled cases
  return ApiResponseHandler.internalError();
}

export function withErrorHandler(handler: Function) {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleError(error);
    }
  };
}