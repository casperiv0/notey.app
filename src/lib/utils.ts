import { INote } from "@models/Note.model";
import { LOCKED_NOTE_MSG } from "./constants";

// eslint-disable-next-line eqeqeq
export const isTrue = (v: string): boolean => v == "true";

export function errorObj(err: string): { error: typeof err; status: "error" } {
  return {
    error: err,
    status: "error",
  };
}

export function parseLockedNotes(notes: INote[]) {
  return notes.map((note: INote) => {
    if (note.locked === true) {
      note.body = LOCKED_NOTE_MSG;
      note.markdown = LOCKED_NOTE_MSG;
    }
    return note;
  });
}
