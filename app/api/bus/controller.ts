import { BusService } from "@/lib/services/bus.service";

export const BusController = {
  create: async (req) => {
    const data = await req.json();
    const bus = await BusService.createBus(data);
    return Response.json(bus);
  },

  list: async () => {
    const buses = await BusService.getAllBuses();
    return Response.json(buses);
  }
};
