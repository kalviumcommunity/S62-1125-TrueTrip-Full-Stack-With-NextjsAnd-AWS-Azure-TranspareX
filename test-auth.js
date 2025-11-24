const testAuth = async () => {
  console.log('🚀 Testing Authentication System...\n');

  // Test 1: Public route
  console.log('1. Testing public route...');
  try {
    const publicRes = await fetch('http://localhost:3000/api/public');
    const publicData = await publicRes.json();
    console.log('✅ Public route:', publicData.message);
  } catch (error) {
    console.log('❌ Public route failed:', error.message);
  }

  // Test 2: Signup
  console.log('\n2. Testing user signup...');
  try {
    const signupRes = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123'
      })
    });
    const signupData = await signupRes.json();
    
    if (signupData.success) {
      console.log('✅ Signup successful');
      console.log('   User:', signupData.data.user.email);
      console.log('   Token received:', signupData.data.token ? 'Yes' : 'No');
      
      const token = signupData.data.token;

      // Test 3: Protected users route
      console.log('\n3. Testing protected users route...');
      const usersRes = await fetch('http://localhost:3000/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const usersData = await usersRes.json();
      console.log('✅ Users route:', usersData.message);

      // Test 4: Admin route (should fail)
      console.log('\n4. Testing admin route (should fail for user)...');
      const adminRes = await fetch('http://localhost:3000/api/admin', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const adminData = await adminRes.json();
      if (!adminData.success) {
        console.log('✅ Admin route correctly blocked:', adminData.message);
      } else {
        console.log('❌ Admin route should have been blocked!');
      }

    } else {
      console.log('❌ Signup failed:', signupData.message);
    }
  } catch (error) {
    console.log('❌ Signup test failed:', error.message);
  }
};

testAuth();