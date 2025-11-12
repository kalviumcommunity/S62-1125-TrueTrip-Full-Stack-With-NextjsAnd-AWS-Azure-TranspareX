'use client';
import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState('');

  const testEndpoint = async (url: string, options?: any) => {
    setLoading(url);
    setResponse('Loading...');
    
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error}`);
    } finally {
      setLoading('');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Error Handling Middleware Demo</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Test Error Scenarios</h2>
        <button onClick={() => testEndpoint('/api/users')}>
          Test Default Error
        </button>
        <button onClick={() => testEndpoint('/api/users?error=validation')}>
          Test Validation Error
        </button>
        <button onClick={() => testEndpoint('/api/users?error=database')}>
          Test Database Error
        </button>
      </div>

      <div>
        <h3>API Response:</h3>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '1rem', 
          borderRadius: '5px',
          minHeight: '200px'
        }}>
          {response || 'Click a button to test...'}
        </pre>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#e9ecef', borderRadius: '5px' }}>
        <h3>Check the Console!</h3>
        <p>Open browser DevTools (F12) to see structured JSON logs from the error handler.</p>
      </div>
    </div>
  );
}