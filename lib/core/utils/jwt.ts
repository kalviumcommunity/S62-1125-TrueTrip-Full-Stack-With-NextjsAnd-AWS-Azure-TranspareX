import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_ISSUER = process.env.JWT_ISSUER || 'truetrip-app';

export interface JWTPayload {
  userId: string;
  email: string;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}

export class JWTUtils {
  static generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    // Fix: Use a more specific type for options
    const options: jwt.SignOptions = {
      expiresIn: JWT_EXPIRES_IN as any, // Type assertion to fix the type issue
      issuer: JWT_ISSUER,
    };
    
    return jwt.sign(payload, JWT_SECRET, options);
  }

  static verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, JWT_SECRET, { 
        issuer: JWT_ISSUER,
      }) as JWTPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token has expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token');
      }
      throw new Error('Token verification failed');
    }
  }

  static decodeToken(token: string): JWTPayload | null {
    try {
      return jwt.decode(token) as JWTPayload;
    } catch {
      return null;
    }
  }
}

export default JWTUtils;