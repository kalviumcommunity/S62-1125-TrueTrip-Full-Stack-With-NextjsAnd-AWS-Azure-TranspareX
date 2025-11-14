// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validations/auth";
import { generateAccessToken, generateRefreshToken } from "@/lib/utils/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate input using Zod
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Validation failed", 
          errors: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const { email, username, password, firstName, lastName, role } = validationResult.data;

    // Check if user already exists with email or username
    const existingUser = await prisma.tripUser.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });
    
    if (existingUser) {
      const field = existingUser.email === email ? "email" : "username";
      return NextResponse.json(
        { 
          success: false, 
          message: `User already exists with this ${field}` 
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user in TripUser table
    const user = await prisma.tripUser.create({
      data: { 
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        role
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true
      }
    });

    // Generate tokens
    const tokenPayload = { 
      id: user.id, 
      email: user.email, 
      username: user.username,
      role: user.role 
    };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    const response = NextResponse.json({
      success: true,
      message: "User registered successfully",
      user,
      accessToken,
      refreshToken,
      expiresIn: "15 minutes"
    });

    // Set HTTP-only cookies for additional security
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 // 15 minutes
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;

  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}