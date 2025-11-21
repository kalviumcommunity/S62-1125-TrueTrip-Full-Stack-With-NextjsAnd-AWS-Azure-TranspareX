import { TripService } from "@/lib/services/trip.service";

export const TripController = {
  create: async (req) => {
    const data = await req.json();
    const trip = await TripService.createTrip(data);
    return Response.json(trip);
  },

  list: async () => {
    const trips = await TripService.getTrips();
    return Response.json(trips);
  }
};
