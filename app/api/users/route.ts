import { NextRequest } from 'next/server';
import { ApiResponseHandler } from '@/lib/utils/validations/api-response';
import { withErrorHandler } from '@/lib/utils/errorHandler';
import { db, toSafeUser } from '@/lib/utils/prisma';

export const GET = withErrorHandler(async (req: NextRequest) => {
  const userRole = req.headers.get('x-user-role');
  const userEmail = req.headers.get('x-user-email');
  const userId = req.headers.get('x-user-id');

  console.log('User route accessed by:', { userId, userEmail, userRole });

  // Get all users from database using the correct method
  const users = await db.user.findAll();
  
  // Convert to safe users without sensitive data (skip conversion if already safe)
  const safeUsers = users.map((user: any) =>
    // call toSafeUser only when the raw user contains a password; otherwise assume it's already safe
    'password' in user ? toSafeUser(user as any) : user
  );

  return ApiResponseHandler.success('Users retrieved successfully', {
    currentUser: { 
      id: userId, 
      email: userEmail, 
      role: userRole 
    },
    users: safeUsers,
    total: safeUsers.length,
    timestamp: new Date().toISOString()
  });
});