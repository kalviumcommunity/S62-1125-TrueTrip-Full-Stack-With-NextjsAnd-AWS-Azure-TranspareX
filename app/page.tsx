'use client';
import { useState } from 'react';

export default function HomePage() {
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
    <div className="p-8 max-w-5xl mx-auto">
      {/* --- Header --- */}
      <header className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">TrueTrip</h1>
        <div>
          <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded">Login</a>
          <a href="/signup" className="px-4 py-2 bg-green-500 text-white rounded ml-2">Signup</a>
        </div>
      </header>

      {/* --- Bus Search Section --- */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Search Buses</h2>
        <form className="flex gap-2">
          <input placeholder="From" className="border p-2 flex-1"/>
          <input placeholder="To" className="border p-2 flex-1"/>
          <input type="date" className="border p-2"/>
          <button type="submit" className="bg-blue-500 text-white px-4 rounded">Search</button>
        </form>
      </section>

      {/* --- Error Testing (Optional Dev Section) --- */}
      <section className="mb-8 p-4 bg-gray-100 rounded">
        <h2 className="font-semibold mb-2">Test API Endpoints</h2>
        <div className="flex gap-2 mb-4">
          <button onClick={() => testEndpoint('/api/users')} className="bg-gray-300 px-2 py-1 rounded">Default Error</button>
          <button onClick={() => testEndpoint('/api/users?error=validation')} className="bg-gray-300 px-2 py-1 rounded">Validation Error</button>
          <button onClick={() => testEndpoint('/api/users?error=database')} className="bg-gray-300 px-2 py-1 rounded">Database Error</button>
        </div>
        <pre className="bg-white p-2 rounded min-h-[150px]">{response || 'Click a button to test...'}</pre>
      </section>

      {/* --- Why TrueTrip / Refund Transparency --- */}
      <section className="p-4 bg-blue-50 rounded">
        <h2 className="font-semibold mb-2">Why TrueTrip?</h2>
        <p>Transparent ticket cancellations, reliable service, and refunds processed clearly.</p>
      </section>
    </div>
  );
}
