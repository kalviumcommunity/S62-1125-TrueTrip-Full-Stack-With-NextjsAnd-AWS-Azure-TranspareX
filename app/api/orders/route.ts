import { NextRequest } from 'next/server';
import { ApiResponse } from '@/lib/api-response';

let orders = [
  { id: 1, userId: 1, productId: 1, quantity: 1, total: 999.99 },
  { id: 2, userId: 2, productId: 2, quantity: 2, total: 39.98 },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    // Implement pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = orders.slice(startIndex, endIndex);

    return ApiResponse.success(
      'Orders retrieved successfully',
      {
        orders: paginatedOrders,
        pagination: {
          page,
          limit,
          total: orders.length,
          totalPages: Math.ceil(orders.length / limit)
        }
      }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return ApiResponse.error('Internal server error', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.userId || !body.productId || !body.quantity) {
      return ApiResponse.badRequest('UserId, productId, and quantity are required');
    }

    const newOrder = {
      id: orders.length + 1,
      userId: parseInt(body.userId),
      productId: parseInt(body.productId),
      quantity: parseInt(body.quantity),
      total: body.total || 0,
    };

    orders.push(newOrder);

    return ApiResponse.success(
      'Order created successfully',
      newOrder,
      201
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return ApiResponse.error('Internal server error', 500);
  }
}