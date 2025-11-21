import prisma from "../db/prisma";

export const TripService = {
  createTrip: async (data) => {
    return await prisma.trip.create({ data });
  },

  getTrips: async () => {
    return await prisma.trip.findMany({
      include: { bus: true }
    });
  },

  getTripById: async (id) => {
    return await prisma.trip.findUnique({
      where: { id },
      include: { bus: true }
    });
  }
};
