// lib/responseHandler.ts
import { NextResponse } from "next/server";
import { ERROR_CODES, ErrorCode } from "./errorCodes";

interface SuccessResponse {
  success: true;
  message: string;
  data?: any;
  timestamp: string;
}

interface ErrorResponse {
  success: false;
  message: string;
  error: {
    code: string;
    details?: any;
  };
  timestamp: string;
}

export const sendSuccess = (
  data: any = null, 
  message: string = "Success", 
  status: number = 200
): NextResponse<SuccessResponse> => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
};

export const sendError = (
  message: string = "Something went wrong",
  code: ErrorCode = "INTERNAL_SERVER_ERROR",
  status: number = 500,
  details?: any
): NextResponse<ErrorResponse> => {
  return NextResponse.json(
    {
      success: false,
      message,
      error: { 
        code: ERROR_CODES[code], 
        details 
      },
      timestamp: new Date().toISOString(),
    },
    { status }
  );
};

// Convenience methods for common HTTP statuses
export const sendCreated = (data: any, message: string = "Resource created successfully") => 
  sendSuccess(data, message, 201);

export const sendNoContent = () => 
  new NextResponse(null, { status: 204 });

export const sendBadRequest = (message: string = "Bad request", details?: any) => 
  sendError(message, "VALIDATION_ERROR", 400, details);

export const sendUnauthorized = (message: string = "Unauthorized") => 
  sendError(message, "UNAUTHORIZED", 401);

export const sendForbidden = (message: string = "Forbidden") => 
  sendError(message, "FORBIDDEN", 403);

export const sendNotFound = (message: string = "Resource not found") => 
  sendError(message, "NOT_FOUND", 404);

export const sendInternalError = (message: string = "Internal server error", details?: any) => 
  sendError(message, "INTERNAL_SERVER_ERROR", 500, details);