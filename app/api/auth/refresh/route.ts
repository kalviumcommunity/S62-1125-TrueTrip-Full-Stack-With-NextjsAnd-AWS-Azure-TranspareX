// app/api/auth/refresh/route.ts
import { NextResponse } from "next/server";
import { refreshTokenSchema } from "@/lib/validations/auth";
import { verifyRefreshToken, generateAccessToken } from "@/lib/utils/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const validationResult = refreshTokenSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: "Invalid refresh token" },
        { status: 400 }
      );
    }

    const { refreshToken } = validationResult.data;

    try {
      // Verify refresh token
      const decoded = verifyRefreshToken(refreshToken);
      
      // Generate new access token
      const newAccessToken = generateAccessToken({
        id: decoded.id,
        email: decoded.email,
        username: decoded.username,
        role: decoded.role
      });

      const response = NextResponse.json({
        success: true,
        accessToken: newAccessToken,
        expiresIn: "15 minutes"
      });

      // Update access token cookie
      response.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60
      });

      return response;

    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired refresh token" },
        { status: 401 }
      );
    }

  } catch (error: any) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}