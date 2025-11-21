import { NextResponse } from "next/server";
import { successResponse } from "./api-response";

export const respond = <T>(data: T, message = "Success", status = 200) => {
  return NextResponse.json(successResponse(data, message), { status });
};
