// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth";
import { generateAccessToken, generateRefreshToken } from "@/lib/utils/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate input using Zod
    const validationResult = loginSchema.safeParse(body);
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

    const { email, password } = validationResult.data;

    // Find user by email
    const user = await prisma.tripUser.findUnique({ 
      where: { email } 
    });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

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
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      accessToken,
      refreshToken,
      expiresIn: "15 minutes"
    });

    // Set HTTP-only cookies
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60
    });

    return response;

  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}