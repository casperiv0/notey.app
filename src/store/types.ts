import * as React from "react";
import Category from "types/Category";
import Note from "types/Note";
import User from "types/User";

export type Dis<T> = React.Dispatch<T | SetLoading>;

export interface SetLoading {
  type: "SET_CATEGORY_LOADING" | "SET_AUTH_LOADING" | "SET_NOTE_LOADING";
  loading: boolean;
}

// note actions
export interface GetNoteById {
  type: "GET_NOTE_BY_ID";
  note: Note;
}

export interface PinRequired {
  type: "PIN_REQUIRED";
  pinRequired: boolean;
  tempNoteId: string;
}

export interface GetAllNotes {
  type: "GET_NOTES";
  notes: Note[];
}

export interface CreateNote {
  type: "CREATE_NOTE";
  note: Note;
  notes: Note[];
}

export interface SetEditing {
  type: "SET_EDITING";
  editing: boolean;
}

export interface UpdateEditingNote {
  type: "UPDATE_EDITING_NOTE";
  note: Note;
}

export interface UpdateNoteById {
  type: "UPDATE_NOTE_BY_ID";
  notes: Note[];
  note: Note;
}

export interface DeleteNoteById {
  type: "DELETE_NOTE_BY_ID";
  notes: Note[];
  note: Note;
}

// category actions
export interface UpdateCategoriesState {
  // do this because it all returns the same data.
  type: "GET_CATEGORIES" | "UPDATE_CATEGORY_BY_ID" | "CREATE_CATEGORY" | "DELETE_CATEGORY";
  categories: Category[];
}

// auth actions
export interface Authenticate {
  type: "AUTHENTICATE";
  user: User | null;
  isAuth: boolean;
}

export interface UpdatePinCode {
  type: "UPDATE_PIN_CODE";
}
