import mongoose, { Schema, model, Document } from "mongoose";
import { IUser } from "./User.model";

export interface ICategory extends Document {
  user_id: IUser["_id"];
  name: string;
  created_at: Date;
}

const categorySchema = new Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    max: 20,
  },
  created_at: {
    type: String,
    default: () => Date.now,
  },
});

export default model<ICategory>("Category", categorySchema);
