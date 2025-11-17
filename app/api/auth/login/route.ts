import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { AuthValidations } from '@/lib/utils/validations/auth';
import { ApiResponseHandler } from '@/lib/utils/validations/api-response';
import { JWTUtils } from '@/lib/utils/jwt';
import { db, toSafeUser } from '@/lib/utils/prisma';
import { Logger } from '@/lib/utils/logger';
import { withErrorHandler, AuthenticationError } from '@/lib/utils/errorHandler';

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();

  // Validate input
  const validatedData = AuthValidations.validateLogin(body);

  // Find user with password
  const user = await db.user.findByEmail(validatedData.email);

  if (!user) {
    throw new AuthenticationError('Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(
    validatedData.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AuthenticationError('Invalid email or password');
  }

  // Generate token (convert userId to string for JWT)
  const token = JWTUtils.generateToken({
    userId: user.id.toString(), // Convert number to string for JWT
    email: user.email,
    username: user.username,
    role: user.role,
  });

  // Update last login
  await db.user.updateLastLogin(user.id);

  // Log the login
  Logger.audit('user_login', user.id.toString(), { email: user.email });

  // Convert to safe user without password
  const safeUser = toSafeUser(user);

  return ApiResponseHandler.success('Login successful', {
    user: safeUser,
    token,
  });
});