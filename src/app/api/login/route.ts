import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createResponse } from "@/helper/responseHelper";
import { HttpStatusCode } from "axios";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return createResponse(HttpStatusCode.BadRequest, "Thiếu email hoặc mật khẩu");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return createResponse(HttpStatusCode.NotFound, "Email không tồn tại");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return createResponse(HttpStatusCode.Unauthorized, "Mật khẩu không đúng");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return createResponse(HttpStatusCode.Ok, "Đăng nhập thành công", {
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      }
    });
  } catch (error) {
    console.error(error);
    return createResponse(HttpStatusCode.InternalServerError, "Lỗi server");
  }
}
