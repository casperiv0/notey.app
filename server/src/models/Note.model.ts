import { Schema, model, Document } from "mongoose";
import { IUser } from "./User.model";
import { ICategory } from "./Category.model";

export interface INote extends Document {
  user_id: IUser["_id"];
  category_id: ICategory["_id"];
  title: string;
  body: string;
  markdown: string;
  created_at: Date;
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
    type: String,
    default: () => Date.now,
  },
});

export default model<INote>("Note", noteSchema);
