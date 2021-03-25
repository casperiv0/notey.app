import { Schema, model, Document, models } from "mongoose";
import { IUser } from "./User.model";

export interface ICategory extends Document {
  user_id: IUser["_id"];
  name: string;
  created_at: Date;
}

const categorySchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    max: 20,
  },
  created_at: {
    type: Date,
    default: () => Date.now(),
  },
});

export default models.Category || model<ICategory>("Category", categorySchema);
