import Note from "./Note";
import User from "./User";

interface State {
  auth: {
    user: User | null;
    loading: boolean;
    isAuth: boolean;
  };
  notes: {
    note: Note;
  };
}

export default State;
