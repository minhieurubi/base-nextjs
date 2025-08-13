import { HttpStatusCode } from "axios";
import { createResponse } from "@/helper/responseHelper";

export function getUserPayload(req: Request) {
  const payloadHeader = req.headers.get("x-user-payload");
  if (!payloadHeader) {
    return {
      error: createResponse(
        HttpStatusCode.Unauthorized,
        "Không có thông tin user"
      ),
      payload: null,
    };
  }

  try {
    const payload = JSON.parse(payloadHeader);
    return { error: null, payload };
  } catch (e) {
    return {
      error: createResponse(
        HttpStatusCode.BadRequest,
        "Payload không hợp lệ"
      ),
      payload: null,
    };
  }
}
