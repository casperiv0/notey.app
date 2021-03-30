import { toast } from "react-toastify";
import { NO_ERROR } from "@lib/constants";
import { handleRequest, isSuccess, RequestData } from "@lib/fetch";
import {
  GET_NOTE_BY_ID,
  SET_NOTE_LOADING,
  GET_NOTES,
  CREATE_NOTE,
  SET_EDITING,
  UPDATE_EDITING_NOTE,
  UPDATE_NOTE_BY_ID,
  DELETE_NOTE_BY_ID,
} from "../types";
import Note from "types/Note";

export const getNoteById = (noteId: string, share: boolean, cookie?: string) => async (
  dispatch,
) => {
  dispatch({ type: SET_NOTE_LOADING, loading: true });

  try {
    const path = share === true ? `/notes/share/${noteId}` : `/notes/${noteId}`;
    const res = await handleRequest(path, "GET", {
      cookie,
    });

    if (isSuccess(res)) {
      dispatch({
        type: GET_NOTE_BY_ID,
        note: res.data.note,
        loading: false,
      });
    }
  } catch (e) {
    toast.error(e?.response?.data?.error ?? NO_ERROR);
    dispatch({ type: SET_NOTE_LOADING, loading: false });
  }
};

export const updateNoteById = (noteId: string, data: RequestData) => async (dispatch) => {
  dispatch({ type: SET_NOTE_LOADING, loading: true });

  try {
    const res = await handleRequest(`/notes/${noteId}`, "PUT", data);

    if (isSuccess(res)) {
      dispatch({
        type: UPDATE_NOTE_BY_ID,
        note: res.data.note,
        notes: res.data.notes,
        loading: false,
      });

      toast.success("Successfully updated note");
    }
  } catch (e) {
    toast.error(e?.response?.data?.error ?? NO_ERROR);
    dispatch({ type: SET_NOTE_LOADING, loading: false });
  }
};

export const deleteNoteById = (noteId: string) => async (dispatch) => {
  dispatch({ type: SET_NOTE_LOADING, loading: true });

  try {
    const res = await handleRequest(`/notes/${noteId}`, "DELETE");

    if (isSuccess(res)) {
      dispatch({
        type: DELETE_NOTE_BY_ID,
        note: res.data.notes[0],
        notes: res.data.notes,
        loading: false,
      });

      toast.success("Successfully deleted note");
    }
  } catch (e) {
    toast.error(e?.response?.data?.error ?? NO_ERROR);
    dispatch({ type: SET_NOTE_LOADING, loading: false });
  }
};

export const getNotes = (cookie?: string) => async (dispatch) => {
  try {
    dispatch({ type: SET_NOTE_LOADING, loading: true });

    const res = await handleRequest("/notes", "GET", { cookie });

    if (isSuccess(res)) {
      dispatch({
        type: GET_NOTES,
        notes: res.data.notes,
      });
    }
  } catch (e) {
    toast.error(e?.response?.data?.error ?? NO_ERROR);
    dispatch({ type: SET_NOTE_LOADING, loading: false });
  }
};

export const createNote = (data: RequestData) => async (dispatch): Promise<boolean | string> => {
  dispatch({ type: SET_NOTE_LOADING, loading: true });

  try {
    const res = await handleRequest("/notes", "POST", data);

    if (isSuccess(res)) {
      dispatch({
        type: CREATE_NOTE,
        notes: res.data.notes,
        note: res.data.note,
      });

      return res.data.note?._id;
    } else {
      toast.error(res.data?.error ?? NO_ERROR);
      dispatch({ type: SET_NOTE_LOADING, loading: false });

      return false;
    }
  } catch (e) {
    toast.error(e?.response?.data?.error ?? NO_ERROR);
    dispatch({ type: SET_NOTE_LOADING, loading: false });
    return false;
  }
};

export const setEditing = (v: boolean) => (dispatch) => {
  dispatch({ type: SET_EDITING, editing: v });
};

export const updateEditingNote = (data: Partial<Note>) => (dispatch) => {
  dispatch({
    type: UPDATE_EDITING_NOTE,
    note: data,
  });
};
