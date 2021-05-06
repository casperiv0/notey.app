import State from "types/State";
import {
  CreateNote,
  DeleteNoteById,
  GetAllNotes,
  GetNoteById,
  PinRequired,
  SetEditing,
  SetLoading,
  UpdateEditingNote,
  UpdateNoteById,
} from "../types";

type Actions =
  | GetNoteById
  | SetLoading
  | GetAllNotes
  | CreateNote
  | SetEditing
  | UpdateEditingNote
  | UpdateNoteById
  | DeleteNoteById
  | PinRequired;

const initState: State["notes"] = {
  note: null,
  notes: [],
  loading: false,
  editing: null,
  editingNote: null,
  pinRequired: false,
  tempNoteId: null,
};

export default function NoteReducer(state = initState, action: Actions): State["notes"] {
  switch (action.type) {
    case "GET_NOTE_BY_ID": {
      return {
        ...state,
        note: action.note ?? null,
        editingNote: action.note ?? null,
        loading: false,
        editing: null,
        pinRequired: false,
        tempNoteId: null,
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
        notes: action.notes ?? [],
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
        notes: action.notes ?? [],
        note: action.note ?? null,
        loading: false,
      };
    }
    case "DELETE_NOTE_BY_ID": {
      return {
        ...state,
        note: action.note ?? null,
        notes: action.notes ?? [],
        editingNote: action.note ?? null,
        loading: false,
        editing: null,
      };
    }
    case "PIN_REQUIRED": {
      return {
        ...state,
        pinRequired: action.pinRequired,
        tempNoteId: action.tempNoteId,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
