import { NextRequest } from 'next/server';
import { ApiResponse } from '@/lib/api-response';

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = parseInt(params.id);
    
    if (isNaN(userId)) {
      return ApiResponse.badRequest('Invalid user ID');
    }

    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return ApiResponse.notFound('User');
    }

    return ApiResponse.success('User retrieved successfully', user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return ApiResponse.error('Internal server error', 500);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = parseInt(params.id);
    
    if (isNaN(userId)) {
      return ApiResponse.badRequest('Invalid user ID');
    }

    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return ApiResponse.notFound('User');
    }

    const body = await request.json();
    
    // Validation
    if (!body.name || !body.email) {
      return ApiResponse.badRequest('Name and email are required');
    }

    // Update user
    users[userIndex] = { ...users[userIndex], ...body };

    return ApiResponse.success('User updated successfully', users[userIndex]);
  } catch (error) {
    console.error('Error updating user:', error);
    return ApiResponse.error('Internal server error', 500);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = parseInt(params.id);
    
    if (isNaN(userId)) {
      return ApiResponse.badRequest('Invalid user ID');
    }

    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return ApiResponse.notFound('User');
    }

    // Remove user
    const deletedUser = users.splice(userIndex, 1)[0];

    return ApiResponse.success('User deleted successfully', deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
    return ApiResponse.error('Internal server error', 500);
  }
}