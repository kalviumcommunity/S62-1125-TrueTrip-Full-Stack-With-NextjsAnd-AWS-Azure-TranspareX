// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateToken, requireRole } from "@/middleware/auth";

export async function GET(req: Request) {
  try {
    // Authenticate user
    const authResult = await authenticateToken(req as any);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: 401 }
      );
    }

    // Check if user has admin role
    try {
      requireRole(['ADMIN'])(authResult.user);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Insufficient permissions" },
        { status: 403 }
      );
    }

    // Get all users (admin only)
    const users = await prisma.tripUser.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      users,
      count: users.length
    });

  } catch (error: any) {
    console.error("Admin users error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}