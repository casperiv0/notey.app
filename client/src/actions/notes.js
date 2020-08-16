import { handleRequest, isSuccess } from "../utils/functions";
import {
  GET_NOTES,
  GET_ACTIVE_NOTE,
  CREATE_NOTE,
  CREATE_NOTE_ERR,
  DELETE_NOTE,
  UPDATE_NOTE
} from "../utils/types";

export const getNotes = () => (dispatch) => {
  handleRequest("/notes", "GET")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: GET_NOTES, notes: res.data.notes });
      }
    })
    .catch((e) => console.log(e));
};

export const getActiveNote = (id) => (dispatch) => {
  handleRequest(`/notes/${id}`, "GET")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: GET_ACTIVE_NOTE, note: res.data.note });
      }
    })
    .catch((e) => console.log(e));
};

export const createNote = (data) => (dispatch) => {
  handleRequest("/notes", "POST", data).then((res) => {
    if (isSuccess(res)) {
      dispatch({
        type: CREATE_NOTE,
        createdNote: res.data.note,
        notes: res.data.notes,
      });
    } else {
      dispatch({ type: CREATE_NOTE_ERR, error: res.data.error });
    }
  });
};

export const deleteNoteById = (id) => (dispatch) => {
  handleRequest(`/notes/${id}`, "DELETE")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: DELETE_NOTE, notes: res.data.notes });
      }
    })
    .catch((e) => console.log(e));
};

export const updateLastActiveNote = (id) => (dispatch) => {
  handleRequest(`/notes/${id}`, "PUT")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: GET_NOTES, notes: res.data.notes });
      }
    })
    .catch((e) => console.log(e));
};

export const updateNoteById = (id, data) => (dispatch) => {
  handleRequest(`/notes/${id}`, "PUT", data)
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({
          type: UPDATE_NOTE,
          note: res.data.note,
          notes: res.data.notes,
        });
      } else {
        console.log(res.data);
      }
    })
    .catch((e) => console.log(e));
};
