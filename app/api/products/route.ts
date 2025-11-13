import { NextRequest } from 'next/server';
import { ApiResponse } from '@/lib/api-response';

let products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'electronics' },
  { id: 2, name: 'Book', price: 19.99, category: 'education' },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const category = searchParams.get('category');

    // Filter products
    let filteredProducts = products;
    if (category) {
      filteredProducts = products.filter(product => 
        product.category === category
      );
    }

    // Implement pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return ApiResponse.success(
      'Products retrieved successfully',
      {
        products: paginatedProducts,
        pagination: {
          page,
          limit,
          total: filteredProducts.length,
          totalPages: Math.ceil(filteredProducts.length / limit)
        }
      }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return ApiResponse.error('Internal server error', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.price || !body.category) {
      return ApiResponse.badRequest('Name, price, and category are required');
    }

    const newProduct = {
      id: products.length + 1,
      name: body.name,
      price: parseFloat(body.price),
      category: body.category,
    };

    products.push(newProduct);

    return ApiResponse.success(
      'Product created successfully',
      newProduct,
      201
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return ApiResponse.error('Internal server error', 500);
  }
}