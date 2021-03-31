import { Schema, model, Document, models, ObjectId } from "mongoose";

export interface ICategory extends Document {
  user_id: ObjectId;
  name: string;
  created_at: number;
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
