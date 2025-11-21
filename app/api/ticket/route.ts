import { TicketController } from "./controller";

export async function POST(req) {
  const userId = "TEMP-USER-ID"; // replace later with JWT user id
  return TicketController.book(req, userId);
}
