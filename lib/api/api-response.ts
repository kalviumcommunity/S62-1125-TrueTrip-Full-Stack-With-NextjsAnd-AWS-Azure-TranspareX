import { ERROR_CODES, ErrorCode } from "./errorCodes";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errorCode?: ErrorCode;
}

export const successResponse = <T>(data: T, message = "Success"): ApiResponse<T> => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message: string, errorCode: ErrorCode): ApiResponse => ({
  success: false,
  message,
  errorCode,
});
