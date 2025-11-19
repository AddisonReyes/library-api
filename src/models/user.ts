import mongoose, { Schema, Document } from "mongoose";
import { HasType } from "typescript";

export type UserRole = "client" | "technician";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date },
});

const User = mongoose.model<IUser>("user", UserSchema);

export default User;
