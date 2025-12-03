// app/logout/route.ts
import { NextResponse } from "next/server";

const COOKIE_NAME = "truetrip_token";

export async function POST(req: Request) {
  // Build an absolute URL using the current request URL as base
  const redirectUrl = new URL("/login", req.url);

  const res = NextResponse.redirect(redirectUrl, { status: 302 });

  // Clear the auth cookie
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, // expire immediately
  });

  return res;
}
