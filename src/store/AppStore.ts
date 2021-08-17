import { action, makeAutoObservable } from "mobx";
import Category from "types/Category";
import Note from "types/Note";
import User from "types/User";

export class AppStore {
  constructor() {
    makeAutoObservable(this, {
      setUser: action,
    });
  }

  /** an array of notes for the authenticated user */
  notes: Note[] = [];

  /** an array of categories for the authenticated user */
  categories: Category[] = [];

  /** the authenticated user */
  user: User | null = null;

  /** whether the user is authenticated */
  isAuth = false;

  /** whether the user is editing the current note */
  editing = false;

  /** the currently active note */
  note: Note | null = null;

  /** the note that is currently being edited. This is also used to track changed data. */
  editingNote: Note | null = null;

  /** whether the pin code is required for a note */
  pinRequired = false;

  setUser(user: User | null, setAuth = true) {
    this.user = user;

    if (setAuth) {
      this.isAuth = !!user;
    }
  }

  setEditingNote(note: any) {
    this.editingNote = note;
  }

  setEditing(value: boolean) {
    this.editing = value;
  }

  setCurrentNote(note: Note) {
    this.note = note;
  }

  hydrate(data: any) {
    if (!data) return;
    if (typeof data !== "object") return;

    for (const item in data) {
      this[item] = data[item];
    }
  }
}
