import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { ApiResponseHandler } from '@/lib/utils/validations/api-response';
import { JWTUtils } from '@/lib/utils/jwt';
import { db, toSafeUser } from '@/lib/utils/prisma';
import { Logger } from '@/lib/utils/logger';
import { withErrorHandler, ConflictError } from '@/lib/utils/errorHandler';

export const POST = withErrorHandler(async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log('Signup request received:', body);
    
    // Basic validation
    const { firstName, lastName, username, email, password } = body;
    
    if (!firstName || !lastName || !username || !email || !password) {
      return ApiResponseHandler.error('All fields are required', 400);
    }

    // Check if user already exists by email
    const existingUserByEmail = await db.user.findByEmail(email);
    if (existingUserByEmail) {
      throw new ConflictError('User with this email already exists');
    }

    // Check if user already exists by username
    const existingUserByUsername = await db.user.findByUsername(username);
    if (existingUserByUsername) {
      throw new ConflictError('User with this username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user using TripUser model
    const user = await db.user.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: hashedPassword,
      role: 'USER', // Make sure this matches your UserRole enum
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
  } catch (error: any) {
    console.error('Signup error details:', error);
    return ApiResponseHandler.error(
      error.message || 'Internal server error', 
      error.statusCode || 500
    );
  }
});