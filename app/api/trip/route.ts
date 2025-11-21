import { TripController } from "./controller";

export async function GET() {
  return TripController.list();
}

export async function POST(req) {
  return TripController.create(req);
}
