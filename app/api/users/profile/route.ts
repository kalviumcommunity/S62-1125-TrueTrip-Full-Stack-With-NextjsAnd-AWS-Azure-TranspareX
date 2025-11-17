// app/api/users/profile/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils/prisma";
import { authenticateToken } from "@/middleware/auth";

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

    // Get user profile
    const user = await prisma.tripUser.findUnique({
      where: { id: authResult.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        trips: {
          select: {
            id: true,
            title: true,
            destination: true,
            startDate: true,
            endDate: true
          }
        },
        bookings: {
          select: {
            id: true,
            status: true,
            totalAmount: true,
            peopleCount: true,
            bookedAt: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });

  } catch (error: any) {
    console.error("Profile error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}