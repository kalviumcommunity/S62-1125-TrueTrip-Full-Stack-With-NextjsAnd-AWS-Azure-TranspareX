// lib/api-response.ts
import { NextResponse } from 'next/server';

export class ApiResponse {
  static success<T>(message: string, data?: T, status: number = 200) {
    return NextResponse.json(
      { success: true, message, data },
      { status }
    );
  }

  static error(message: string, status: number = 500) {
    return NextResponse.json(
      { success: false, message, data: null },
      { status }
    );
  }

  static notFound(resource: string = 'Resource') {
    return this.error(`${resource} not found`, 404);
  }

  static badRequest(message: string = 'Bad request') {
    return this.error(message, 400);
  }

  static unauthorized(message: string = 'Unauthorized') {
    return this.error(message, 401);
  }
}