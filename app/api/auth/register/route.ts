import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { registerSchema } from "../../../../lib/validation";
import { handleError } from "../../../../lib/errorHandler";
import { ResponseHandler } from "../../../../lib/responseHandler";
import { AuthService } from "../../../../lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.tripUser.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { username: validatedData.username },
        ],
      },
    });

    if (existingUser) {
      return ResponseHandler.sendError(
        "User with this email or username already exists",
        400,
        "USER_EXISTS"
      );
    }

    // Hash password
    const passwordHash = await AuthService.hashPassword(validatedData.password);

    // Create user
    const user = await prisma.tripUser.create({
      data: {
        email: validatedData.email,
        username: validatedData.username,
        password: passwordHash,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        role: "USER",
      },
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

    // Generate token
    const token = AuthService.generateToken({
      userId: user.id.toString(),
      email: user.email,
      role: user.role,
    });

    return ResponseHandler.sendSuccess("User registered successfully", {
      user,
      token,
    });
  } catch (error) {
    return handleError(error);
  }
}