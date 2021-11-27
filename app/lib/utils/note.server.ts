import { Category, Note } from ".prisma/client";
import { LOCKED_NOTE_MSG } from "../constants";

export function withCategoryLockedNotes(category: Category & { notes: Note[] }) {
  return {
    ...category,
    notes: withLockedNotes(category.notes),
  };
}

export function withLockedNotes<T extends Note[] | Note = Note[]>(
  notes: T,
): T extends any[] ? (Note & { isLocked?: boolean })[] : T & { isLocked?: boolean } {
  if (Array.isArray(notes)) {
    return notes.map((note) => ({
      ...note,
      body: note.pinCodeLocked ? LOCKED_NOTE_MSG : note.body,
      markdown: note.pinCodeLocked ? LOCKED_NOTE_MSG : note.markdown,
      isLocked: true,
    })) as any;
  }

  return {
    ...notes,
    body: notes.pinCodeLocked ? LOCKED_NOTE_MSG : notes.body,
    markdown: notes.pinCodeLocked ? LOCKED_NOTE_MSG : notes.markdown,
    isLocked: true,
  } as any;
}
