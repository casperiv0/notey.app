import {
  CREATE_NOTE,
  GET_NOTES,
  GET_ACTIVE_NOTE,
  CREATE_NOTE_ERR,
  DELETE_NOTE,
  UPDATE_NOTE,
  SET_LOADING,
  GET_SHARE_BY_ID,
  UPDATE_NOTE_OPTIONS,
  GET_ACTIVE_NOTE_LOCKED,
  GET_ACTIVE_NOTE_ERROR,
  GET_SHARE_ERROR,
} from "../utils/types";

const initState = {
  notes: [],
  note: null,
  share: null,
  createdNote: {},
  error: null,
  loading: false,
  tempNoteId: null,
  closeAble: false,
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
    case CREATE_NOTE_ERR:
      return {
        ...state,
        error: action.error,
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
    case GET_ACTIVE_NOTE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case GET_SHARE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return {
        ...state,
        closeAble: false,
      };
  }
}
