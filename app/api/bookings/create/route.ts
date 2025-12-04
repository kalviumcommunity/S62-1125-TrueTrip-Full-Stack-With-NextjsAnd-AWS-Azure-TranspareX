import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { sendMail } from "@/lib/email";


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
    // Fire-and-forget email (don't block response if it fails)
try {
  await sendMail({
    to: user.email,
    subject: "Your TrueTrip booking is confirmed 🚌",
    html: `
      <h2>Trip booked successfully</h2>
      <p>Hi ${user.name || "there"},</p>
      <p>Your trip from <b>${fromCity}</b> to <b>${toCity}</b> on
      <b>${new Date(journeyDate).toDateString()}</b> has been booked.</p>
      ${
        amount
          ? `<p>Amount: <b>₹${Number(amount)}</b></p>`
          : ""
      }
      <p>You can cancel and track your refund anytime from your TrueTrip dashboard.</p>
      <p style="margin-top:16px;">— TrueTrip</p>
    `,
  });
} catch (e) {
  console.error("Failed to send booking email", e);
}


    return NextResponse.json({ booking });
  } catch (err) {
    console.error("Create booking error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
