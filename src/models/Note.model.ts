import { Schema, model, Document, models } from "mongoose";
import { IUser } from "./User.model";
import { ICategory } from "./Category.model";

export interface INote extends Document {
  user_id: IUser["_id"];
  category_id: ICategory["_id"];
  title: string;
  body: string;
  markdown: string;
  created_at: number;
  shared: boolean;
  locked: boolean;
}

const noteSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  category_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    max: 40,
  },
  body: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: () => Date.now(),
  },
  shared: {
    type: Boolean,
    default: () => false,
  },
  locked: {
    type: Boolean,
    default: () => false,
  },
});

export default models.Note || model<INote>("Note", noteSchema);
