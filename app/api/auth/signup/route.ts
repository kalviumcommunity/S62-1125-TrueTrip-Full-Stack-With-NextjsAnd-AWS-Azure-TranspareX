import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
// Lightweight in-file AuthValidations fallback to avoid missing module errors
type SignupInput = {
  firstName?: unknown;
  lastName?: unknown;
  username?: unknown;
  email?: unknown;
  password?: unknown;
};

type SignupData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

const AuthValidations = {
  validateSignup(input: SignupInput): SignupData {
    const errors: Array<{ path: string[]; message: string }> = [];
    const firstName = typeof input?.firstName === 'string' ? input.firstName.trim() : '';
    const lastName = typeof input?.lastName === 'string' ? input.lastName.trim() : '';
    const username = typeof input?.username === 'string' ? input.username.trim() : '';
    const email = typeof input?.email === 'string' ? input.email.trim() : '';
    const password = typeof input?.password === 'string' ? input.password : '';

    if (!firstName) errors.push({ path: ['firstName'], message: 'First name is required' });
    if (!lastName) errors.push({ path: ['lastName'], message: 'Last name is required' });
    if (!username) errors.push({ path: ['username'], message: 'Username is required' });
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push({ path: ['email'], message: 'Valid email is required' });
    if (!password || password.length < 6) errors.push({ path: ['password'], message: 'Password must be at least 6 characters' });

    if (errors.length) {
      const err: any = new Error('Validation failed');
      err.errors = errors;
      throw err;
    }

    return { firstName, lastName, username, email: email.toLowerCase(), password };
  },

  sanitizeUserInput(data: SignupData) {
    return {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      username: data.username.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };
  },
};
import { ApiResponseHandler } from '@/lib/utils/validations/api-response';
import { JWTUtils } from '@/lib/utils/jwt';
import { db, toSafeUser } from '@/lib/utils/prisma';
import { Logger } from '@/lib/utils/logger';
import { withErrorHandler, ConflictError } from '@/lib/utils/errorHandler';

export const POST = withErrorHandler(async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log('Signup request received:', body);
    
    // Validate input using AuthValidations
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

    // Create user
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
  } catch (error: any) {
    console.error('Signup error details:', error);
    
    // Handle Zod validation errors
    if (error.errors) {
      return ApiResponseHandler.error(
        'Validation failed', 
        400, 
        { validationErrors: error.errors }
      );
    }
    
    return ApiResponseHandler.error(
      error.message || 'Internal server error', 
      error.statusCode || 500
    );
  }
});