const BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  console.log('=== Testing Kalvium API ===\n');

  try {
    // Test GET all users
    console.log('1. Testing GET /api/users');
    const usersResponse = await fetch(`${BASE_URL}/users`);
    const usersData = await usersResponse.json();
    console.log('Status:', usersResponse.status);
    console.log('Response:', JSON.stringify(usersData, null, 2));
    console.log('');

    // Test POST new user
    console.log('2. Testing POST /api/users');
    const newUser = {
      name: 'Charlie',
      email: 'charlie@example.com'
    };
    
    const postResponse = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });
    const postData = await postResponse.json();
    console.log('Status:', postResponse.status);
    console.log('Response:', JSON.stringify(postData, null, 2));
    console.log('');

    // Test GET user by ID
    console.log('3. Testing GET /api/users/1');
    const userResponse = await fetch(`${BASE_URL}/users/1`);
    const userData = await userResponse.json();
    console.log('Status:', userResponse.status);
    console.log('Response:', JSON.stringify(userData, null, 2));
    console.log('');

    // Test pagination
    console.log('4. Testing pagination: GET /api/users?page=1&limit=2');
    const paginatedResponse = await fetch(`${BASE_URL}/users?page=1&limit=2`);
    const paginatedData = await paginatedResponse.json();
    console.log('Status:', paginatedResponse.status);
    console.log('Pagination data:', paginatedData.data.pagination);
    console.log('');

    // Test error handling
    console.log('5. Testing error handling: GET /api/users/999');
    const errorResponse = await fetch(`${BASE_URL}/users/999`);
    const errorData = await errorResponse.json();
    console.log('Status:', errorResponse.status);
    console.log('Error response:', JSON.stringify(errorData, null, 2));
    console.log('');

    // Test products API
    console.log('6. Testing GET /api/products');
    const productsResponse = await fetch(`${BASE_URL}/products`);
    const productsData = await productsResponse.json();
    console.log('Status:', productsResponse.status);
    console.log('Products count:', productsData.data.products.length);
    console.log('');

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAPI();