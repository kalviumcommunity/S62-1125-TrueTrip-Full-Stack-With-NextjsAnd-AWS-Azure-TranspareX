import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { loginSchema } from "../../../../lib/validation";
import { handleError, AuthenticationError } from "../../../../lib/errorHandler";
import { ResponseHandler } from "../../../../lib/responseHandler";
import { AuthService } from "../../../../lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = loginSchema.parse(body);

    // Find user
    const user = await prisma.tripUser.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      throw new AuthenticationError("Invalid credentials");
    }

    // Verify password
    const isValidPassword = await AuthService.verifyPassword(validatedData.password, user.password);

    if (!isValidPassword) {
      throw new AuthenticationError("Invalid credentials");
    }

    // Generate token
    const token = AuthService.generateToken({
      userId: user.id.toString(),
      email: user.email,
      role: user.role,
    });

    return ResponseHandler.sendSuccess("Login successful", {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return handleError(error);
  }
}