import mongoose, { Schema, Document } from "mongoose";
import { ROLES } from "@/constants/roles";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  urlAvatar: string;
  role: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    urlAvatar: { type: String },
    role: { type: String, required: true, default: ROLES.USER }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
