import { NextResponse } from "next/server";
import { handleError, ValidationError, DatabaseError } from "@/lib/errorHandler";

export async function GET() {
  try {
    // Simulate different scenarios based on query params
    throw new Error("Database connection failed!");
  } catch (error) {
    return handleError(error, "GET /api/users");
  }
}

// Enhanced version with multiple error types
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const errorType = searchParams.get('error');
    
    if (errorType === 'validation') {
      throw new ValidationError("Invalid user data: email is required");
    }
    
    if (errorType === 'database') {
      throw new DatabaseError("Failed to connect to database");
    }
    
    // Success case
    return NextResponse.json({ 
      success: true, 
      message: "User created successfully" 
    });
  } catch (error) {
    return handleError(error, "POST /api/users");
  }
}