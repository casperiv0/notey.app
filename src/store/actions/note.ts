import { toast } from "react-toastify";
import { NO_ERROR } from "@lib/constants";
import { handleRequest, isSuccess } from "@lib/fetch";
import { GET_NOTE_BY_ID, SET_LOADING, GET_NOTES } from "../types";

export const getNoteById = (noteId: string, share: boolean, cookie?: string) => async (
  dispatch,
) => {
  try {
    dispatch({ type: SET_LOADING, loading: true });

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
    dispatch({ type: SET_LOADING, loading: false });
  }
};

export const getNotes = (cookie?: string) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, loading: true });

    const res = await handleRequest("/notes", "GET", { cookie });

    if (isSuccess(res)) {
      dispatch({
        type: GET_NOTES,
        notes: res.data.notes,
      });
    }
  } catch (e) {
    toast.error(e?.response?.data?.error ?? NO_ERROR);
    dispatch({ type: SET_LOADING, loading: false });
  }
};
