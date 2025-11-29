import { NextResponse } from "next/server";

interface SuccessResponse {
  success: true;
  message: string;
  data?: any;
  timestamp: string;
}

interface ErrorResponse {
  success: false;
  message: string;
  errorCode?: string | undefined;
  details?: any | undefined;
  timestamp: string;
}

export class ResponseHandler {
  static sendSuccess(message: string, data?: any): NextResponse<SuccessResponse> {
    return NextResponse.json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static sendError(message: string, statusCode: number = 500, errorCode?: string, details?: any): NextResponse<ErrorResponse> {
    return NextResponse.json(
      {
        success: false,
        message,
        errorCode,
        details,
        timestamp: new Date().toISOString(),
      },
      { status: statusCode }
    );
  }

  static sendCreated(message: string, data?: any): NextResponse<SuccessResponse> {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  }
}