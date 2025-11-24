import { NextRequest } from 'next/server';
import { ApiResponseHandler } from '@/lib/utils/validations/api-response';
import { withErrorHandler } from '@/lib/utils/errorHandler';
import { Logger } from '@/lib/utils/logger';

export const GET = withErrorHandler(async (req: NextRequest) => {
  const userRole = req.headers.get('x-user-role');
  const userEmail = req.headers.get('x-user-email');
  const userId = req.headers.get('x-user-id');

  Logger.info('admin_access', userId!, { email: userEmail, role: userRole });

  return ApiResponseHandler.success('Welcome Admin! You have full access.', {
    user: {
      id: userId,
      email: userEmail,
      role: userRole
    },
    capabilities: [
      'Manage users',
      'View analytics',
      'System configuration',
      'Content moderation'
    ],
    timestamp: new Date().toISOString()
  });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');
  const userId = req.headers.get('x-user-id');

  Logger.audit('admin_action', userId!, { action });

  return ApiResponseHandler.success(`Admin action '${action}' executed successfully`, {
    action,
    executedBy: userId,
    timestamp: new Date().toISOString()
  });
});