import prisma from "../db/prisma";

export const BusService = {
  createBus: async (data) => {
    return await prisma.bus.create({ data });
  },

  getAllBuses: async () => {
    return await prisma.bus.findMany();
  },

  getBusById: async (id) => {
    return await prisma.bus.findUnique({ where: { id } });
  }
};
