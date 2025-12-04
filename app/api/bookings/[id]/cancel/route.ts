import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { sendMail } from "@/lib/email";


function calculateRefundEstimate(journeyDate: Date, amount: number) {
  const now = new Date();
  const diffMs = journeyDate.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  let percentage = 0;
  let note = "";

  if (diffHours > 24) {
    percentage = 0.9;
    note =
      "Cancelled more than 24 hours before departure: ~90% refund as per policy.";
  } else if (diffHours > 6) {
    percentage = 0.7;
    note =
      "Cancelled 6–24 hours before departure: ~70% refund as per policy.";
  } else {
    percentage = 0;
    note =
      "Cancelled less than 6 hours before departure: no refund as per policy.";
  }

  const estimatedAmount = Math.round(amount * percentage);

  return { estimatedAmount, note };
}

interface Params {
  params: { id: string };
}

export async function POST(_req: Request, { params }: Params) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const bookingId = params.id;

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

    // 🌸 NEW: calculate estimated refund & explanation
    const { estimatedAmount, note } = calculateRefundEstimate(
      booking.journeyDate,
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
          ? `<p style="color:#555;font-size:14px;">${refund.policyNote}</p>`
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
