import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: ValidationError[]; // Make it explicitly optional
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export class ApiResponseHandler {
  static success<T>(
    message: string, 
    data: T,
    status: number = 200
  ): NextResponse<ApiResponse<T>> {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(response, { status });
  }

  static created<T>(message: string, data: T): NextResponse<ApiResponse<T>> {
    return this.success(message, data, 201);
  }

  static error(
    message: string, 
    status: number = 500,
    errors?: ValidationError[]
  ): NextResponse<ApiResponse> {
    // Create response with explicit undefined for errors when not provided
    const response: ApiResponse = {
      success: false,
      message,
      timestamp: new Date().toISOString(),
    };
    
    // Only add errors if they exist
    if (errors && errors.length > 0) {
      response.errors = errors;
    }
    
    return NextResponse.json(response, { status });
  }

  static validationError(errors: ValidationError[]): NextResponse<ApiResponse> {
    return this.error('Validation failed', 400, errors);
  }

  static unauthorized(message: string = 'Unauthorized'): NextResponse<ApiResponse> {
    return this.error(message, 401);
  }

  static forbidden(message: string = 'Forbidden'): NextResponse<ApiResponse> {
    return this.error(message, 403);
  }

  static notFound(message: string = 'Resource not found'): NextResponse<ApiResponse> {
    return this.error(message, 404);
  }

  static conflict(message: string = 'Resource already exists'): NextResponse<ApiResponse> {
    return this.error(message, 409);
  }

  static internalError(message: string = 'Internal server error'): NextResponse<ApiResponse> {
    return this.error(message, 500);
  }
}