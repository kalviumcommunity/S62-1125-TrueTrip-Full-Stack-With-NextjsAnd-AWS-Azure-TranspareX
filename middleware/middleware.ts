import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple token verification for middleware (don't import complex services)
function verifyToken(token: string): { userId: string; email: string; role: string } {
  try {
    // Simple JWT verification without external dependencies
    
    // This is a simplified version - in production, use a proper JWT library
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }
    if (!parts[1]) {
      throw new Error("Invalid token format");
    }
    const payload = JSON.parse(
      Buffer.from(parts[1], 'base64').toString()
    );
    
    // Very basic check - in real app, use proper signature verification
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      throw new Error("Token expired");
    }
    
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role
    };
  } catch (error) {
    throw new Error("Invalid token");
  }
}

const protectedRoutes = [
  "/api/trips",
  "/api/bookings",
  "/api/auth/me",
];

const adminRoutes = [
  "/api/admin",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route) && !pathname.includes("/auth/login") && !pathname.includes("/auth/register")
  );

  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    try {
      const payload = verifyToken(token);
      
      // Add user to request headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", payload.userId);
      requestHeaders.set("x-user-email", payload.email);
      requestHeaders.set("x-user-role", payload.role);

      // Check admin routes
      if (isAdminRoute && payload.role !== "ADMIN") {
        return NextResponse.json(
          { success: false, message: "Insufficient permissions" },
          { status: 403 }
        );
      }

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};