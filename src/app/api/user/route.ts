import { connectDB } from "@/lib/mongodb";
import { createResponse } from "@/helper/responseHelper";
import { HttpStatusCode } from "axios";
import User from "@/models/User";
import { getUserPayload } from "@/ultis/getUserPayload";
import * as bcrypt from "bcrypt";
import { ROLES } from "@/constants/roles";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { error, payload } = getUserPayload(req);
    if (error) return error;

    const userId = payload?.id as string;
    if (!userId) {
      return createResponse(HttpStatusCode.BadRequest, "invalid_token");
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return createResponse(HttpStatusCode.NotFound, "user_not_found");
    }

    return createResponse(HttpStatusCode.Ok, "success", user);
  } catch (error) {
    console.error(error);
    return createResponse(HttpStatusCode.InternalServerError, "server_error");
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const { error, payload } = getUserPayload(req);
    if (error) return error;

    const body = await req.json();
    let targetId = payload.id;

    if (payload.role === ROLES.ADMIN && body.id) {
      targetId = body.id;
    }

    if (payload.role === ROLES.USER && body.id && body.id !== payload.id) {
      return createResponse(HttpStatusCode.Forbidden, "permission_denied");
    }

    delete body.id;

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      targetId,
      body,
      { new: true }
    ).select('-password');

    return createResponse(HttpStatusCode.Ok, "update_user_success", updatedUser);
  } catch (err) {
    console.error(err);
    return createResponse(HttpStatusCode.InternalServerError, "server_error");
  }
}
