// app/api/tasks/route.ts
import { 
  sendSuccess, 
  sendCreated, 
  sendBadRequest, 
  sendNotFound,
  sendInternalError 
} from "@/lib/responseHandler";

// Mock database
let tasks = [
  { id: 1, title: "Learn Next.js", completed: false, userId: 1 },
  { id: 2, title: "Build API", completed: true, userId: 2 }
];

export async function GET() {
  try {
    // REMOVE or REDUCE the delay if it's too long
    await new Promise(resolve => setTimeout(resolve, 100)); // Reduced from 150ms
    
    // REMOVE the random error simulation for testing
    // if (Math.random() < 0.1) {
    //   throw new Error("Database connection failed");
    // }
    
    return sendSuccess(tasks, "Tasks fetched successfully");
  } catch (err) {
    return sendInternalError("Failed to fetch tasks", err);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validation
    if (!data.title) {
      return sendBadRequest("Missing required field: title");
    }
    
    if (!data.userId) {
      return sendBadRequest("Missing required field: userId");
    }
    
    // Create new task
    const newTask = {
      id: tasks.length + 1,
      title: data.title,
      completed: data.completed || false,
      userId: data.userId
    };
    
    tasks.push(newTask);
    
    return sendCreated(newTask, "Task created successfully");
  } catch (err) {
    return sendInternalError("Failed to create task", err);
  }
}