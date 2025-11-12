// lib/errorHandler.ts
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export function handleError(error: unknown, context: string): Response {
  const isProd = process.env.NODE_ENV === "production";
  
  let statusCode = 500;
  let userMessage = "Something went wrong. Please try again later.";
  
  if (error instanceof ValidationError) {
    statusCode = 400;
    userMessage = isProd ? "Invalid request data" : error.message;
  } else if (error instanceof AuthenticationError) {
    statusCode = 401;
    userMessage = isProd ? "Authentication failed" : error.message;
  } else if (error instanceof DatabaseError) {
    statusCode = 503;
    userMessage = isProd ? "Service temporarily unavailable" : error.message;
  } else if (error instanceof Error && error.message?.includes("not found")) {
    statusCode = 404;
    userMessage = isProd ? "Resource not found" : error.message;
  }

  const errorResponse = {
    success: false,
    message: isProd ? userMessage : (error instanceof Error ? error.message : "Unknown error"),
    timestamp: new Date().toISOString(),
    ...(!isProd && error instanceof Error && error.stack ? { stack: error.stack } : {})
  };

  console.error(JSON.stringify({
    level: "error",
    message: `Error in ${context}`,
    meta: {
      name: error instanceof Error ? error.name : 'UnknownError',
      message: error instanceof Error ? error.message : String(error),
      statusCode,
      context
    },
    timestamp: new Date().toISOString()
  }));

  return new Response(JSON.stringify(errorResponse), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
