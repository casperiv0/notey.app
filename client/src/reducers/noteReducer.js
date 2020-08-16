import {
  CREATE_NOTE,
  GET_NOTES,
  GET_ACTIVE_NOTE,
  CREATE_NOTE_ERR,
  DELETE_NOTE,
} from "../utils/types";

const initState = {
  notes: [],
  note: {},
  createdNote: {},
  error: null,
};

export default function (state = initState, action) {
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
        error: "",
      };
    case GET_ACTIVE_NOTE:
      return {
        ...state,
        note: action.note,
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
      };
    default:
      return {
        ...state,
      };
  }
}
