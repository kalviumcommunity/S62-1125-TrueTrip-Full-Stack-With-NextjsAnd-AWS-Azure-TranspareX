import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

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

    // Simple rule: only future trips can be cancelled
    const today = new Date();
    if (booking.journeyDate <= today) {
      return NextResponse.json(
        { error: "Past trips cannot be cancelled" },
        { status: 400 }
      );
    }

    // Transaction: cancel + create refund
    const [updatedBooking, refund] = await prisma.$transaction([
      prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CANCELLED" },
      }),
      prisma.refund.create({
        data: {
          bookingId: bookingId,
          status: "PENDING",
        },
      }),
    ]);

    return NextResponse.json({ booking: updatedBooking, refund });
  } catch (err) {
    console.error("Cancel booking error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
