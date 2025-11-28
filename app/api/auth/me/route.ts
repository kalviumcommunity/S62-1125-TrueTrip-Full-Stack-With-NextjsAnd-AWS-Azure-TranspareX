import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleError, AuthenticationError } from "@/lib/errorHandler";
import { ResponseHandler } from "@/lib/responseHandler";
import { AuthService } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = AuthService.getUserIdFromRequest(request);

    const user = await prisma.tripUser.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AuthenticationError("User not found");
    }

    return ResponseHandler.sendSuccess("User data retrieved", { user });
  } catch (error) {
    return handleError(error);
  }
}