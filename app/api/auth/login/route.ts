import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { AuthValidations } from '@/lib/utils/validations/auth';
import { ApiResponseHandler } from '@/lib/utils/validations/api-response';
import { JWTUtils } from '@/lib/utils/jwt';
import { db, toSafeUser } from '@/lib/utils/prisma';
import { Logger } from '@/lib/utils/logger';
import { withErrorHandler, UnauthorizedError } from '@/lib/utils/errorHandler';

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  
  // Validate input
  const validatedData = AuthValidations.validateLogin(body);
  const sanitizedData = AuthValidations.sanitizeUserInput(validatedData);

  // Find user by email or username
  const user = await db.user.findByEmail(sanitizedData.email) || 
                await db.user.findByUsername(sanitizedData.email);

  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(sanitizedData.password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  // Generate token
  const token = JWTUtils.generateToken({
    userId: user.id.toString(),
    email: user.email,
    username: user.username,
    role: user.role,
  });

  // Log the login
  Logger.audit('user_login', user.id.toString(), { email: user.email });

  // Convert to safe user without password
  const safeUser = toSafeUser(user);

  return ApiResponseHandler.success('Login successful', {
    user: safeUser,
    token,
  });
});