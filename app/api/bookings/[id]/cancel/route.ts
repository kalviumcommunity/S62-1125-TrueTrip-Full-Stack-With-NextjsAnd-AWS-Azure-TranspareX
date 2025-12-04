// app/api/bookings/[id]/cancel/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { sendMail } from "@/lib/email";

// 🌸 NEW LOGIC: Time-Since-Booking (Accountability Model)
function calculateRefundEstimate(bookingDate: Date, amount: number) {
  const now = new Date();
  
  // Calculate how long the user has held the ticket (in milliseconds)
  const diffMs = now.getTime() - bookingDate.getTime();
  
  // Convert to weeks (Math.ceil ensures even 1 minute counts as "Week 1")
  const weeksHeld = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24 * 7)));

  // Calculate percentage: 100% initially, drops by 10% each subsequent week
  // Week 1 = 100 - 0 = 100%
  // Week 2 = 100 - 10 = 90%
  // Week 3 = 100 - 20 = 80%
  let percentageRaw = 100 - (weeksHeld - 1) * 10;

  // Safety clamps (cannot be negative)
  if (percentageRaw < 0) percentageRaw = 0;

  const percentage = percentageRaw / 100;
  const estimatedAmount = Math.round(amount * percentage);

  let note = "";
  if (percentage === 1) {
    note = "Full refund: Cancelled within the first week of booking.";
  } else if (percentage === 0) {
    note = "No refund: Booking was held for too long.";
  } else {
    note = `${percentageRaw}% refund: Cancelled within ${weeksHeld} weeks of booking.`;
  }

  return { estimatedAmount, note };
}

interface Params {
  params: { id: string };
}

export async function POST(req: Request, { params }: Params) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const bookingId = params.id;

    // Fetch booking (createdAt is selected by default)
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { refund: true },
    });

    if (!booking || booking.userId !== user.id) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.status === "CANCELLED") {
      return NextResponse.json(
        { error: "Booking already cancelled" },
        { status: 400 }
      );
    }

    // Only future trips can be cancelled
    const now = new Date();
    if (booking.journeyDate <= now) {
      return NextResponse.json(
        { error: "Past trips cannot be cancelled" },
        { status: 400 }
      );
    }

    // 🌸 NEW: Calculate estimate using Booking Date (createdAt)
    const { estimatedAmount, note } = calculateRefundEstimate(
      booking.createdAt,
      booking.amount
    );

    // Transaction: cancel + create refund with estimate
    const [updatedBooking, refund] = await prisma.$transaction([
      prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CANCELLED" },
      }),
      prisma.refund.create({
        data: {
          bookingId: bookingId,
          status: "PENDING",
          estimatedAmount,
          policyNote: note,
        },
      }),
    ]);

    try {
      await sendMail({
        to: user.email,
        subject: "Your refund request has been received 💸",
        html: `
          <h2>Refund request received</h2>
          <p>Hi ${user.name || "there"},</p>
          <p>Your trip from <b>${booking.fromCity}</b> to <b>${
          booking.toCity
        }</b> on
          <b>${booking.journeyDate.toDateString()}</b> has been cancelled.</p>
          ${
            typeof refund.estimatedAmount === "number"
              ? `<p>Estimated refund: <b>₹${refund.estimatedAmount}</b></p>`
              : ""
          }
          ${
            refund.policyNote
              ? `<p style="color:#555;font-size:14px;">Policy: ${refund.policyNote}</p>`
              : ""
          }
          <p>You can track this refund anytime from your TrueTrip dashboard.</p>
          <p style="margin-top:16px;">— TrueTrip</p>
        `,
      });
    } catch (e) {
      console.error("Failed to send refund email", e);
    }

    return NextResponse.json({ booking: updatedBooking, refund });
  } catch (err) {
    console.error("Cancel booking error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}