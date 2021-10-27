import * as yup from "yup";
import { Schema, model, Document, models } from "mongoose";
import { Note } from "types/Note";

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

export const createOrUpdateNoteSchema = yup.object({
  category_id: yup.string().trim().required(),
  title: yup.string().trim().required().max(40),
  body: yup.string().trim().required(),
  shareable: yup.boolean().notRequired().default(false),
  locked: yup.boolean().notRequired().default(false),
});

export type NoteDoc = Note & Document;
export default models.Note || model<NoteDoc>("Note", noteSchema);
