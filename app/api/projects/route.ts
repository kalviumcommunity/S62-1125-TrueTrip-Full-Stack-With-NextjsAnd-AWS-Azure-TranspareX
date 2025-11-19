// app/api/projects/route.ts
import { 
  sendSuccess, 
  sendCreated, 
  sendBadRequest, 
  sendUnauthorized,
  sendInternalError 
} from "@/lib/responseHandler";

// Mock database
let projects = [
  { id: 1, name: "Website Redesign", status: "active", ownerId: 1 },
  { id: 2, name: "Mobile App", status: "completed", ownerId: 2 }
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    
    let filteredProjects = projects;
    
    if (status) {
      filteredProjects = projects.filter(project => 
        project.status === status
      );
    }
    
    return sendSuccess(filteredProjects, "Projects fetched successfully");
  } catch (err) {
    return sendInternalError("Failed to fetch projects", err);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Simulate authentication check
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return sendUnauthorized("Authentication required");
    }
    
    // Validation
    if (!data.name) {
      return sendBadRequest("Missing required field: name");
    }
    
    // Create new project
    const newProject = {
      id: projects.length + 1,
      name: data.name,
      status: data.status || "active",
      ownerId: 1 // In real app, get from auth token
    };
    
    projects.push(newProject);
    
    return sendCreated(newProject, "Project created successfully");
  } catch (err) {
    return sendInternalError("Failed to create project", err);
  }
}