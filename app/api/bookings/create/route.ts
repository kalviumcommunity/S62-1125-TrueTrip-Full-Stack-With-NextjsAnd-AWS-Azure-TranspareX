import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { fromCity, toCity, journeyDate, amount } = await req.json();

    const booking = await prisma.booking.create({
      data: {
        fromCity,
        toCity,
        journeyDate: new Date(journeyDate),
        amount: Number(amount),
        userId: user.id,
      },
    });

    return NextResponse.json({ booking });
  } catch (err) {
    console.error("Create booking error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
