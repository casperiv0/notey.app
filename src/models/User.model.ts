import { Schema, model, Document, models } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  created_at: number;
  pin_code: string | null;
}

const userSchema = new Schema<IUser>({
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

export default models.User || model<IUser>("User", userSchema);
