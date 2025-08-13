import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createResponse } from "@/helper/responseHelper";
import { HttpStatusCode } from "axios";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { username, email, password, role } = await req.json();

    if (!username || !email || !password) {
      return createResponse(HttpStatusCode.BadRequest, "Thiếu thông tin");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return createResponse(HttpStatusCode.BadRequest, "Email đã tồn tại");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return createResponse(HttpStatusCode.Created, "Đăng ký thành công", {
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      }
    });
  } catch (error) {
    console.error(error);
    return createResponse(HttpStatusCode.InternalServerError, "Lỗi server");
  }
}
