// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout successful"
    });

    // Clear cookies
    response.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    });

    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    });

    return response;

  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}