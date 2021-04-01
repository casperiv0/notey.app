import { Schema, model, Document, models } from "mongoose";
import User from "types/User";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: () => Date.now(),
  },
  pin_code: {
    type: String,
    default: () => null,
  },
});

export type UserDoc = User & Document;
export default models.User || model<UserDoc>("User", userSchema);
