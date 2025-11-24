import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JWTUtils } from '@/lib/utils/jwt';
import { Logger } from '@/lib/utils/logger';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log(`Middleware processing: ${pathname}`);

  // Public routes that don't require authentication
  const publicRoutes = [
    '/api/auth/signup',
    '/api/auth/login',
    '/api/public',
  ];

  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Protected routes
  if (pathname.startsWith('/api/admin') || pathname.startsWith('/api/users')) {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authentication token missing' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication token missing' },
        { status: 401 }
      );
    }

    try {
      const decoded = JWTUtils.verifyToken(token);
      console.log('Decoded token:', decoded);

      // Role-based access control for admin routes
      if (pathname.startsWith('/api/admin') && decoded.role !== 'ADMIN') {
        Logger.warn('unauthorized_access_attempt', decoded.userId, {
          path: pathname,
          attemptedRole: decoded.role,
          requiredRole: 'ADMIN'
        });
        
        return NextResponse.json(
          { success: false, message: 'Access denied. Admin role required.' },
          { status: 403 }
        );
      }

      // Attach user info for downstream handlers
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('x-user-id', decoded.userId);
      requestHeaders.set('x-user-email', decoded.email);
      requestHeaders.set('x-user-username', decoded.username);
      requestHeaders.set('x-user-role', decoded.role);

      // Log authorized access
      Logger.audit('authorized_access', decoded.userId, {
        path: pathname,
        role: decoded.role
      });

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error: any) {
      console.error('Token verification failed:', error.message);
      Logger.error('token_verification_failed', null, { error: error.message });
      
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/admin/:path*',
    '/api/users/:path*',
  ],
};