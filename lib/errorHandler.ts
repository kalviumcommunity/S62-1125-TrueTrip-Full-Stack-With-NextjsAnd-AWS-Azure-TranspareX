import { NextResponse } from "next/server";

export class AppError extends Error {
  constructor(
    public override message: string,
    public statusCode: number = 500,
    public errorCode?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, "VALIDATION_ERROR");
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, 401, "AUTHENTICATION_ERROR");
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Insufficient permissions") {
    super(message, 403, "AUTHORIZATION_ERROR");
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND");
  }
}

export function handleError(error: unknown) {
  console.error("Error occurred:", {
    error: error instanceof Error ? error.message : "Unknown error",
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  });

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        errorCode: error.errorCode,
        ...(process.env.NODE_ENV === "development" && {
          stack: error.stack,
        }),
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error && error.name === "ZodError") {
    return NextResponse.json(
      {
        success: false,
        message: "Validation failed",
        errorCode: "VALIDATION_ERROR",
        details: error.message,
      },
      { status: 400 }
    );
  }

  const message =
    process.env.NODE_ENV === "development"
      ? error instanceof Error
        ? error.message
        : "Unknown error occurred"
      : "Internal server error";

  return NextResponse.json(
    {
      success: false,
      message,
      errorCode: "INTERNAL_ERROR",
      ...(process.env.NODE_ENV === "development" && {
        stack: error instanceof Error ? error.stack : undefined,
      }),
    },
    { status: 500 }
  );
}