import { TicketController } from "../controller";

export async function PATCH(req, { params }) {
  return TicketController.cancel(params.id);
}
