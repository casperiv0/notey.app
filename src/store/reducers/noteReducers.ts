import Note from "types/Note";
import State from "types/State";
import { GET_NOTES, GET_NOTE_BY_ID, SET_LOADING } from "../types";

type Actions =
  | {
      type: typeof GET_NOTE_BY_ID;
      note: Note;
    }
  | {
      type: typeof SET_LOADING;
      loading: boolean;
    }
  | {
      type: typeof GET_NOTES;
      notes: Note[];
    };

const initState: State["notes"] = {
  note: null,
  notes: [],
  loading: false,
};

export default function NoteReducer(state = initState, action: Actions) {
  switch (action.type) {
    case "GET_NOTE_BY_ID": {
      return {
        ...state,
        ...action,
        note: action.note,
      };
    }
    case "SET_LOADING": {
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
    default: {
      return {
        ...state,
      };
    }
  }
}
