import Note from "types/Note";
import State from "types/State";
import {
  CREATE_NOTE,
  DELETE_NOTE_BY_ID,
  GET_NOTES,
  GET_NOTE_BY_ID,
  SET_EDITING,
  SET_NOTE_LOADING,
  UPDATE_EDITING_NOTE,
  UPDATE_NOTE_BY_ID,
} from "../types";

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
    }
  | {
      type: typeof SET_EDITING;
      editing: boolean;
    }
  | {
      type: typeof UPDATE_EDITING_NOTE;
      note: Note;
    }
  | {
      type: typeof UPDATE_NOTE_BY_ID;
      notes: Note[];
      note: Note;
    }
  | {
      type: typeof DELETE_NOTE_BY_ID;
      notes: Note[];
      note: Note;
    };

const initState: State["notes"] = {
  note: null,
  notes: [],
  loading: false,
  editing: null,
  editingNote: null,
};

export default function NoteReducer(state = initState, action: Actions): State["notes"] {
  switch (action.type) {
    case "GET_NOTE_BY_ID": {
      return {
        ...state,
        ...action,
        note: action.note,
        editingNote: action.note,
        loading: false,
        editing: null,
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
        loading: false,
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
    case "SET_EDITING": {
      return {
        ...state,
        editing: action.editing,
        editingNote: action.editing === null ? null : state.editingNote,
      };
    }
    case "UPDATE_EDITING_NOTE": {
      return {
        ...state,
        editingNote: action.note,
      };
    }
    case "UPDATE_NOTE_BY_ID": {
      return {
        ...state,
        notes: action.notes,
        note: action.note,
        loading: false,
      };
    }
    case "DELETE_NOTE_BY_ID": {
      return {
        ...state,
        note: action.note,
        notes: action.notes,
        editingNote: action.note,
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
