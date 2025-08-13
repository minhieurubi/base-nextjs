import { NextResponse } from "next/server";

export function createResponse(
  status: number = 200,
  message: string = "",
  data?: unknown
) {
  return NextResponse.json({ status, message, data }, { status });
}
