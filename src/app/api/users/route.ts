import { connectDB } from "@/lib/mongodb";
import { createResponse } from "@/helper/responseHelper";
import { HttpStatusCode } from "axios";
import User from "@/models/User";
import { getUserPayload } from "@/ultis/getUserPayload";
import { ROLES } from "@/constants/roles";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { error, payload } = getUserPayload(req);
    if (error) return error;

    if (payload.role !== ROLES.ADMIN) {
      return createResponse(HttpStatusCode.Forbidden, "permission_denied");
    }

    const users = await User.find({ role: ROLES.USER })
      .select("-password")
      .sort({ createdAt: -1 });

    return createResponse(HttpStatusCode.Ok, "success", users);
  } catch (error) {
    console.error(error);
    return createResponse(HttpStatusCode.InternalServerError, "server_error");
  }
}
