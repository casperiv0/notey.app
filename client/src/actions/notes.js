import {
  closeModal,
  handleRequest,
  isSuccess,
  openModal,
} from "../utils/functions";
import {
  GET_NOTES,
  GET_ACTIVE_NOTE,
  CREATE_NOTE,
  UPDATE_NOTE_OPTIONS,
  CREATE_NOTE_ERR,
  DELETE_NOTE,
  UPDATE_NOTE,
  ADD_MESSAGE,
  SET_LOADING,
  GET_SHARE_BY_ID,
  GET_ACTIVE_NOTE_LOCKED,
  GET_ACTIVE_NOTE_ERROR,
  GET_SHARE_ERROR,
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
      console.error(e);
    });
};

export const getActiveNote = (id, pin) => (dispatch) => {
  handleRequest(`/notes/${id}`, "POST", { pin: pin })
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: GET_ACTIVE_NOTE, note: res.data.note });
        dispatch({ type: "default", closeAble: true });
      } else {
        if (res.data.error === "pin_required") {
          dispatch({
            type: GET_ACTIVE_NOTE_LOCKED,
            closeAble: false,
            id: res.data._id,
          });
          openModal("enterPinModal");
        } else {
          dispatch({
            type: GET_ACTIVE_NOTE_ERROR,
            error: res.data.error,
          });
        }
      }
    })
    .catch((e) => {
      dispatch({
        type: ADD_MESSAGE,
        message: "An error occurred while getting the note",
      });
      console.error(e);
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
        return (window.location.href = `/#/app?noteId=${res.data.note._id}`);
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
      console.error(e);
      dispatch({
        type: CREATE_NOTE_ERR,
        error: noError,
      });
      dispatch({
        type: ADD_MESSAGE,
        message: "An error occurred while creating the note",
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
      console.error(e);
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
      console.error(e);
      dispatch({
        type: ADD_MESSAGE,
        message: "An error occurred while updating the note",
      });
    });
};

export const updateNoteOptions = (id, data) => (dispatch) => {
  handleRequest(`/notes/options/${id}`, "POST", data)
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({
          type: UPDATE_NOTE_OPTIONS,
          notes: res.data.notes,
          note: res.data.note,
        });
        if (
          data.shareable === "true" &&
          data.shareable !== String(res.data.note.shareable)
        ) {
          return (window.location.href = `/#/share/${id}`);
        } else {
          closeModal("manageNoteModal");
          dispatch({
            type: ADD_MESSAGE,
            message: "Successfully updated options",
          });
        }
      } else {
        dispatch({
          type: ADD_MESSAGE,
          message: res.data.message,
        });
      }
    })
    .catch((e) => {
      console.error(e);
      dispatch({
        type: ADD_MESSAGE,
        message: "An error occurred while updating the note",
      });
    });
};

export const getShareById = (id) => (dispatch) => {
  handleRequest(`/notes/share/${id}`, "GET")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({
          type: GET_SHARE_BY_ID,
          share: res.data.note,
        });
      } else {
        dispatch({
          type: GET_SHARE_ERROR,
          error: res.data.error,
        });
      }
    })
    .catch((e) => {
      console.error(e);
      dispatch({
        type: GET_SHARE_ERROR,
        message: "An error occurred while updating the note",
      });
    });
};
