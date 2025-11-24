export class ApiResponseHandler {
  static success(message: string, data?: any) {
    return new Response(
      JSON.stringify({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  static created(message: string, data?: any) {
    return new Response(
      JSON.stringify({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  static error(message: string, statusCode: number = 500, details?: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message,
        ...(details && { details }),
        timestamp: new Date().toISOString(),
      }),
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}