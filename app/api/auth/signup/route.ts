// app/api/auth/signup/route.ts
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { AuthValidations } from '@/lib/utils/validations/auth';
import { ApiResponseHandler } from '@/lib/utils/validations/api-response';
import { JWTUtils } from '@/lib/utils/jwt';
import { db, toSafeUser } from '@/lib/utils/prisma';
import { Logger } from '@/lib/utils/logger';
import { withErrorHandler, ConflictError } from '@/lib/utils/errorHandler';

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  console.log('Signup request received:', body);
  
  // Validate input
  const validatedData = AuthValidations.validateSignup(body);
  const sanitizedData = AuthValidations.sanitizeUserInput(validatedData);

  // Check if user already exists by email
  const existingUserByEmail = await db.user.findByEmail(sanitizedData.email);
  if (existingUserByEmail) {
    throw new ConflictError('User with this email already exists');
  }

  // Check if user already exists by username
  const existingUserByUsername = await db.user.findByUsername(sanitizedData.username);
  if (existingUserByUsername) {
    throw new ConflictError('User with this username already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(sanitizedData.password, 12);

  // Create user using TripUser model
  const user = await db.user.create({
    firstName: sanitizedData.firstName,
    lastName: sanitizedData.lastName,
    username: sanitizedData.username,
    email: sanitizedData.email,
    password: hashedPassword,
    role: 'USER',
  });

  // Generate token
  const token = JWTUtils.generateToken({
    userId: user.id.toString(),
    email: user.email,
    username: user.username,
    role: user.role,
  });

  // Log the signup
  Logger.audit('user_signup', user.id.toString(), { email: user.email });

  // Convert to safe user without password
  const safeUser = toSafeUser(user);

  return ApiResponseHandler.created('User created successfully', {
    user: safeUser,
    token,
  });
});