import {
  CREATE_NOTE,
  GET_NOTES,
  GET_ACTIVE_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  SET_LOADING,
  GET_SHARE_BY_ID,
  UPDATE_NOTE_OPTIONS,
  GET_ACTIVE_NOTE_LOCKED,
} from "../utils/types";

const initState = {
  notes: [],
  note: null,
  share: null,
  createdNote: {},
  loading: false,
  tempNoteId: null,
};

export default function noteReducer(state = initState, action) {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.notes,
      };
    case CREATE_NOTE:
      return {
        ...state,
        notes: action.notes,
        createdNote: action.createdNote,
        note: action.createdNote,
        error: null,
      };
    case GET_ACTIVE_NOTE:
      return {
        ...state,
        note: action.note,
        error: null,
        closeAble: true,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: action.notes,
        note: null,
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: action.notes,
        note: action.note,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case UPDATE_NOTE_OPTIONS:
      return {
        ...state,
        notes: action.notes,
        note: action.note,
      };
    case GET_SHARE_BY_ID:
      return {
        ...state,
        share: action.share,
      };
    case GET_ACTIVE_NOTE_LOCKED:
      return {
        ...state,
        tempNoteId: action.id,
        error: null,
        closeAble: action.closeAble,
      };
    default:
      return {
        ...state,
        closeAble: false,
      };
  }
}
