// middleware/auth.ts
import { NextRequest } from 'next/server';
import { verifyAccessToken } from '../lib/utils/jwt';

export async function authenticateToken(req: NextRequest): Promise<{
  success: boolean;
  user?: any;
  error?: string;
}> {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return { success: false, error: 'Access token required' };
    }

    const decoded = verifyAccessToken(token);
    return { success: true, user: decoded };
  } catch (error) {
    return { success: false, error: 'Invalid or expired token' };
  }
}

export function requireRole(allowedRoles: string[]) {
  return (user: any) => {
    if (!allowedRoles.includes(user.role)) {
      throw new Error('Insufficient permissions');
    }
  };
}