import { TicketService } from "@/lib/services/ticket.service";

export const TicketController = {
  book: async (req, userId) => {
    const data = await req.json();
    const ticket = await TicketService.bookTicket({ ...data, userId });
    return Response.json(ticket);
  },

  cancel: async (ticketId) => {
    const result = await TicketService.cancelTicket(ticketId);
    return Response.json(result);
  }
};
