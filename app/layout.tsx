// layout.tsx
// Place this file in the /app directory (Next.js app router). It wraps pages with global layout, fonts, and Tailwind container.

import './globals.css'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrueTrip — Transparency in Bus Refunds',
  description: 'Know your rights, track refunds, and travel with confidence.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="antialiased text-slate-800 bg-gradient-to-br from-pink-50 via-purple-50 to-slate-50">
        <div className="min-h-screen">
          {/* top background glow */}
          <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-br from-pink-50 via-purple-50 to-slate-50" />

          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </body>
    </html>
  )
}
