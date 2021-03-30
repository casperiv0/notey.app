import Note from "./Note";
import User from "./User";
import Category from "./Category";
import { Dispatch } from "react";

interface State {
  auth: {
    user: User | null;
    loading: boolean;
    isAuth: boolean;
  };
  notes: {
    note: Note | null;
    notes: Note[];
    loading: boolean;
    editing: boolean | null;
    editingNote: Note | null;
  };
  categories: {
    categories: Category[];
    loading: boolean;
  };
}

export type AuthDispatch = Dispatch<{ type: string } & Partial<State["auth"]>>;
export type CategoryDispatch = Dispatch<{ type: string } & Partial<State["categories"]>>;
export type NotesDispatch = Dispatch<{ type: string } & Partial<State["notes"]>>;

export default State;
