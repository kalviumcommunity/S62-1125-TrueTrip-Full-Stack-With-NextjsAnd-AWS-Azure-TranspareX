// app/api/users/[id]/route.ts
import { 
  sendSuccess, 
  sendNotFound, 
  sendBadRequest,
  sendInternalError 
} from "@/lib/responseHandler";

let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
];

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    
    if (isNaN(userId)) {
      return sendBadRequest("Invalid user ID");
    }
    
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return sendNotFound("User not found");
    }
    
    return sendSuccess(user, "User fetched successfully");
  } catch (err) {
    return sendInternalError("Failed to fetch user", err);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    const updates = await req.json();
    
    if (isNaN(userId)) {
      return sendBadRequest("Invalid user ID");
    }
    
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return sendNotFound("User not found");
    }
    
    // Validation
    if (updates.email && !updates.email.includes('@')) {
      return sendBadRequest("Invalid email format");
    }
    
    // Update user
    users[userIndex] = { ...users[userIndex], ...updates };
    
    return sendSuccess(users[userIndex], "User updated successfully");
  } catch (err) {
    return sendInternalError("Failed to update user", err);
  }
}