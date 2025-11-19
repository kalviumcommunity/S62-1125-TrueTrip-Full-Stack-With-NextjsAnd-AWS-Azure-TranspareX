// app/api/users/route.ts
import { 
  sendSuccess, 
  sendCreated, 
  sendBadRequest, 
  sendNotFound, 
  sendInternalError 
} from "@/lib/responseHandler";

// Mock database
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
];

export async function GET() {
  try {
    // Simulate database fetch
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return sendSuccess(users, "Users fetched successfully");
  } catch (err) {
    return sendInternalError("Failed to fetch users", err);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validation
    if (!data.name || !data.email) {
      return sendBadRequest("Missing required fields: name and email are required");
    }
    
    if (!data.email.includes('@')) {
      return sendBadRequest("Invalid email format", { field: "email" });
    }
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === data.email);
    if (existingUser) {
      return sendBadRequest("User with this email already exists");
    }
    
    // Create new user
    const newUser = {
      id: users.length + 1,
      name: data.name,
      email: data.email
    };
    
    users.push(newUser);
    
    return sendCreated(newUser, "User created successfully");
  } catch (err) {
    return sendInternalError("Failed to create user", err);
  }
}