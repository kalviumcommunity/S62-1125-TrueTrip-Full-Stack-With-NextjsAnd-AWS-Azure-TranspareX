import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export class AuthService {
  private static JWT_SECRET = process.env.JWT_SECRET || "your-fallback-secret-change-in-production";

  static async hashPassword(password: string): Promise<string> {
    return hash(password, 12);
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: "7d" });
  }

  static verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as JWTPayload;
    } catch {
      throw new Error("Invalid or expired token");
    }
  }

  static getUserIdFromRequest(request: Request): number {
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Authentication required");
    }

    const token = authHeader.substring(7);
    const payload = this.verifyToken(token);
    
    return parseInt(payload.userId);
  }
}

export function requireRole(requiredRole: string, userRole: string) {
  const roleHierarchy = ["USER", "GUIDE", "ADMIN"];
  
  if (roleHierarchy.indexOf(userRole) < roleHierarchy.indexOf(requiredRole)) {
    throw new Error("Insufficient permissions");
  }
}