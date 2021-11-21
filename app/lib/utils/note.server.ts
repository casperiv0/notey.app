import { Category, Note } from ".prisma/client";
import { LOCKED_NOTE_MSG } from "../constants";

export function withCategoryLockedNotes(
  category: Category & { notes: Note[] },
): Category & { notes: Note[] } {
  return {
    ...category,
    notes: withLockedNotes(category.notes),
  };
}

export function withLockedNotes<T extends Note[] | Note = Note[]>(notes: T): T {
  if (Array.isArray(notes)) {
    return notes.map((note) => ({
      ...note,
      body: note.pinCodeLocked ? LOCKED_NOTE_MSG : note.body,
      markdown: note.pinCodeLocked ? LOCKED_NOTE_MSG : note.markdown,
    })) as T;
  }

  return {
    ...notes,
    body: notes.pinCodeLocked ? LOCKED_NOTE_MSG : notes.body,
    markdown: notes.pinCodeLocked ? LOCKED_NOTE_MSG : notes.markdown,
  } as T;
}
