import { handleRequest, isSuccess } from "../utils/functions";
import {
  GET_NOTES,
  GET_ACTIVE_NOTE,
  CREATE_NOTE,
  CREATE_NOTE_ERR,
  DELETE_NOTE,
  UPDATE_NOTE,
  ADD_MESSAGE,
  SET_LOADING,
} from "../utils/types";

const noError =
  "Something went wrong making the request, please try again later";

export const getNotes = () => (dispatch) => {
  handleRequest("/notes", "GET")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: GET_NOTES, notes: res.data.notes });
      }
    })
    .catch((e) => {
      dispatch({
        type: ADD_MESSAGE,
        message: "An error occurred while getting the notes",
      });
      console.log(e);
    });
};

export const getActiveNote = (id) => (dispatch) => {
  handleRequest(`/notes/${id}`, "GET")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: GET_ACTIVE_NOTE, note: res.data.note });
      }
    })
    .catch((e) => {
      dispatch({
        type: ADD_MESSAGE,
        message: "An error occurred while getting the note",
      });
      console.log(e);
    });
};

export const createNote = (data) => (dispatch) => {
  dispatch({ type: SET_LOADING, loading: true });
  handleRequest("/notes", "POST", data)
    .then((res) => {
      if (isSuccess(res)) {
        // return created note
        dispatch({
          type: CREATE_NOTE,
          createdNote: res.data.note,
          notes: res.data.notes,
        });

        // Set success message
        dispatch({
          type: ADD_MESSAGE,
          message: `Successfully created note with title: ${res.data.note.title}`,
        });
        dispatch({ type: SET_LOADING, loading: false });
      } else {
        // disable loading
        dispatch({ type: SET_LOADING, loading: false });

        // return error
        dispatch({
          type: CREATE_NOTE_ERR,
          error: res.data.error ? res.data.error : noError,
        });
      }
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: CREATE_NOTE_ERR,
        error: noError,
      });
      dispatch({
        type: ADD_MESSAGE,
        message: `An error occurred while creating the note`,
      });
    });
};

export const deleteNoteById = (id) => (dispatch) => {
  handleRequest(`/notes/${id}`, "DELETE")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: DELETE_NOTE, notes: res.data.notes });
        dispatch({ type: ADD_MESSAGE, message: "Successfully deleted note" });
      }
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: ADD_MESSAGE,
        message: "An error occurred while deleting the note",
      });
    });
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
        dispatch({ type: ADD_MESSAGE, message: "Successfully updated note" });
      } else {
        dispatch({
          type: ADD_MESSAGE,
          message: "An error occurred while updating the note.",
        });
      }
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: ADD_MESSAGE,
        message: "An error occurred while updating the note",
      });
    });
};
