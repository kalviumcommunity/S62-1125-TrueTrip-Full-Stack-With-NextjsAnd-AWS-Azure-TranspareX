import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createBookingSchema } from "@/lib/validation";
import { handleError, NotFoundError } from "@/lib/errorHandler";
import { ResponseHandler } from "@/lib/responseHandler";
import { AuthService } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = AuthService.getUserIdFromRequest(request);
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const statusParam = searchParams.get("status");

    const skip = (page - 1) * limit;

    const where: any = {
      userId,
      ...(statusParam && { status: statusParam }),
    };

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          trip: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
        orderBy: { bookedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return ResponseHandler.sendSuccess("Bookings retrieved successfully", {
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = AuthService.getUserIdFromRequest(request);
    const body = await request.json();
    
    const validatedData = createBookingSchema.parse(body);

    // Check if trip exists and get price
    const trip = await prisma.trip.findUnique({
      where: { id: validatedData.tripId },
    });

    if (!trip) {
      throw new NotFoundError("Trip");
    }

    // Calculate total amount
    const totalAmount = trip.price * validatedData.peopleCount;

    const booking = await prisma.booking.create({
      data: {
        userId,
        tripId: validatedData.tripId,
        peopleCount: validatedData.peopleCount,
        totalAmount,
        specialRequests: validatedData.specialRequests ?? null,
      },
      include: {
        trip: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return ResponseHandler.sendCreated("Booking created successfully", { booking });
  } catch (error) {
    return handleError(error);
  }
}