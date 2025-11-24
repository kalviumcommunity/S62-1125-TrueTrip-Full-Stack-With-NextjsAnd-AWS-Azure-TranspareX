import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'This is a public route accessible without authentication',
    data: {
      timestamp: new Date().toISOString(),
      note: 'No token required for this endpoint'
    }
  });
}