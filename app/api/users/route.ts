import { NextRequest } from 'next/server';
import { ApiResponse } from '@/lib/api-response';

// Mock data
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';

    // Filter users based on search
    let filteredUsers = users;
    if (search) {
      filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Implement pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return ApiResponse.success(
      'Users retrieved successfully',
      {
        users: paginatedUsers,
        pagination: {
          page,
          limit,
          total: filteredUsers.length,
          totalPages: Math.ceil(filteredUsers.length / limit)
        }
      }
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return ApiResponse.error('Internal server error', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.name || !body.email) {
      return ApiResponse.badRequest('Name and email are required');
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === body.email);
    if (existingUser) {
      return ApiResponse.badRequest('User with this email already exists');
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name: body.name,
      email: body.email,
    };

    users.push(newUser);

    return ApiResponse.success(
      'User created successfully',
      newUser,
      201
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return ApiResponse.error('Internal server error', 500);
  }
}