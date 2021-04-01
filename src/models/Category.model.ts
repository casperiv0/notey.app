import { Schema, model, Document, models } from "mongoose";
import Category from "types/Category";

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

export type CategoryDoc = Category & Document;
export default models.Category || model<CategoryDoc>("Category", categorySchema);
