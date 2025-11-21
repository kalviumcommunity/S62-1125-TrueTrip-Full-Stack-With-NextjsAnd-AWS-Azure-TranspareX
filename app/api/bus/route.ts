import { BusController } from "./controller";

export async function GET() {
  return BusController.list();
}

export async function POST(req) {
  return BusController.create(req);
}
