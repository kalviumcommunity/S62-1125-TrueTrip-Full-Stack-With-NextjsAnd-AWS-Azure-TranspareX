import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createTripSchema } from "@/lib/validation";
import { handleError } from "@/lib/errorHandler";
import { ResponseHandler } from "@/lib/responseHandler";
import { AuthService } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const destination = searchParams.get("destination");
    const search = searchParams.get("search");

    const skip = (page - 1) * limit;

    // Build where clause with proper TypeScript types
    const where: any = {
      isPublished: true,
    };

    if (destination) {
      where.destination = {
        contains: destination,
        mode: "insensitive" as const,
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" as const } },
        { description: { contains: search, mode: "insensitive" as const } },
      ];
    }

    const [trips, total] = await Promise.all([
      prisma.trip.findMany({
        where,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              username: true,
            },
          },
          categories: {
            include: {
              category: true,
            },
          },
          reviews: {
            select: {
              rating: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.trip.count({ where }),
    ]);

    // Calculate average ratings safely
    const tripsWithRatings = trips.map(trip => {
      const reviews = trip.reviews || [];
      const averageRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;
      
      return {
        ...trip,
        averageRating,
        reviewCount: reviews.length,
      };
    });

    return ResponseHandler.sendSuccess("Trips retrieved successfully", {
      trips: tripsWithRatings,
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
    
    const validatedData = createTripSchema.parse({
      ...body,
      price: parseFloat(body.price),
      maxPeople: parseInt(body.maxPeople),
      startDate: new Date(body.startDate).toISOString(),
      endDate: new Date(body.endDate).toISOString(),
    });

    const trip = await prisma.trip.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        destination: validatedData.destination,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        price: validatedData.price,
        maxPeople: validatedData.maxPeople,
        images: validatedData.images || [],
        userId,
        ...(validatedData.categoryIds && validatedData.categoryIds.length > 0 && {
          categories: {
            create: validatedData.categoryIds.map((categoryId: number) => ({
              category: { connect: { id: categoryId } },
            })),
          },
        }),
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    return ResponseHandler.sendCreated("Trip created successfully", { 
      trip: {
        ...trip,
        averageRating: 0,
        reviewCount: 0,
      }
    });
  } catch (error) {
    return handleError(error);
  }
}