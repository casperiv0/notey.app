import { closeModal, handleRequest, isSuccess, openModal } from "../utils/functions";
import {
  GET_NOTES,
  GET_ACTIVE_NOTE,
  CREATE_NOTE,
  UPDATE_NOTE_OPTIONS,
  DELETE_NOTE,
  UPDATE_NOTE,
  SET_LOADING,
  GET_SHARE_BY_ID,
  GET_ACTIVE_NOTE_LOCKED,
} from "../utils/types";
import { toast } from "react-toastify";

const noError = "An unexpected error occurred, please try again later";

export const getNotes = () => (dispatch) => {
  handleRequest("/notes", "GET")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: GET_NOTES, notes: res.data.notes });
      }
    })
    .catch((e) => {
      toast.error(noError);
      console.error(e);
    });
};

export const getActiveNote = (id, pin) => async (dispatch) => {
  return handleRequest(`/notes/${id}`, "POST", { pin: pin })
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: GET_ACTIVE_NOTE, note: res.data.note });
        return true;
      } else {
        if (res.data.error === "pin_required") {
          dispatch({
            type: GET_ACTIVE_NOTE_LOCKED,
            id: res.data._id,
          });
          openModal("enterPinModal");
        } else {
          toast.error(res.data.error);
          return false;
        }
      }
    })
    .catch((e) => {
      toast.error(noError);
      console.error(e);
      return false;
    });
};

export const createNote = (data) => async (dispatch) => {
  dispatch({ type: SET_LOADING, loading: true });

  return handleRequest("/notes", "POST", data)
    .then((res) => {
      if (isSuccess(res)) {
        // return created note
        dispatch({
          type: CREATE_NOTE,
          createdNote: res.data.note,
          notes: res.data.notes,
        });

        // Set success message
        toast.success(`Successfully created note with title: ${res.data.note.title}`);
        dispatch({ type: SET_LOADING, loading: false });
        window.location.href = `/#/app?noteId=${res.data.note._id}`;
        return true;
      } else {
        // disable loading
        dispatch({ type: SET_LOADING, loading: false });

        // return error
        toast.error(res.data.error || noError);
        return false;
      }
    })
    .catch((e) => {
      console.error(e);
      toast.error(noError);
      return false;
    });
};

export const deleteNoteById = (id) => (dispatch) => {
  handleRequest(`/notes/${id}`, "DELETE")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: DELETE_NOTE, notes: res.data.notes });
        toast.success("Successfully deleted note");
      }
    })
    .catch((e) => {
      console.error(e);
      toast.error(noError);
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
        toast.success("Successfully updated note");
      } else {
        toast.error(noError);
      }
    })
    .catch((e) => {
      console.error(e);
      toast.error(noError);
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
        if (data.shareable === "true" && data.shareable !== String(res.data.note.shareable)) {
          return (window.location.href = `/#/share/${id}`);
        } else {
          closeModal("manageNoteModal");
          toast.success("Successfully updated options");
        }
      } else {
        toast.error(res.data.message);
      }
    })
    .catch((e) => {
      console.error(e);
      toast.error(noError);
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
        toast.error(res.data.error);
      }
    })
    .catch((e) => {
      console.error(e);
      toast.error(noError);
    });
};
