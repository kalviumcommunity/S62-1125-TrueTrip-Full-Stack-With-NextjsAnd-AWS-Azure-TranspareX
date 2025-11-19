// lib/errorCodes.ts
export const ERROR_CODES = {
  // Validation errors
  VALIDATION_ERROR: "E001",
  MISSING_REQUIRED_FIELD: "E002",
  INVALID_EMAIL: "E003",
  INVALID_PASSWORD: "E004",
  
  // Resource errors
  NOT_FOUND: "E101",
  ALREADY_EXISTS: "E102",
  FORBIDDEN: "E103",
  UNAUTHORIZED: "E104",
  
  // Database errors
  DATABASE_CONNECTION_ERROR: "E201",
  DATABASE_QUERY_ERROR: "E202",
  DATABASE_TIMEOUT: "E203",
  
  // External service errors
  EXTERNAL_SERVICE_ERROR: "E301",
  EXTERNAL_SERVICE_TIMEOUT: "E302",
  
  // Internal errors
  INTERNAL_SERVER_ERROR: "E500",
  UNKNOWN_ERROR: "E599"
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;