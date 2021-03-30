import Note from "./Note";
import User from "./User";
import Category from "./Category";

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

export default State;
