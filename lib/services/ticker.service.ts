import prisma from "../db/prisma";

export const TicketService = {
  bookTicket: async (data) => {
    return await prisma.ticket.create({ data });
  },

  getUserTickets: async (userId) => {
    return await prisma.ticket.findMany({
      where: { userId },
      include: { trip: true }
    });
  },

  cancelTicket: async (ticketId) => {
    return await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: "CANCELLED" }
    });
  }
};
