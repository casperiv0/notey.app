import Note from "types/Note";
import State from "types/State";
import { CREATE_NOTE, GET_NOTES, GET_NOTE_BY_ID, SET_NOTE_LOADING } from "../types";

type Actions =
  | {
      type: typeof GET_NOTE_BY_ID;
      note: Note;
    }
  | {
      type: typeof SET_NOTE_LOADING;
      loading: boolean;
    }
  | {
      type: typeof GET_NOTES;
      notes: Note[];
    }
  | {
      type: typeof CREATE_NOTE;
      notes: Note[];
      note: Note;
    };

const initState: State["notes"] = {
  note: null,
  notes: [],
  loading: false,
};

export default function NoteReducer(state = initState, action: Actions): State["notes"] {
  switch (action.type) {
    case "GET_NOTE_BY_ID": {
      return {
        ...state,
        ...action,
        note: action.note,
        loading: false,
      };
    }
    case "SET_NOTE_LOADING": {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case "GET_NOTES": {
      return {
        ...state,
        notes: action.notes,
      };
    }
    case "CREATE_NOTE": {
      return {
        ...state,
        notes: action.notes,
        note: action.note,
        loading: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
