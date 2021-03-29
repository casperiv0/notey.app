import { NO_ERROR } from "@lib/constants";
import { handleRequest, isSuccess } from "@lib/fetch";
import { toast } from "react-toastify";
import { GET_NOTE_BY_ID, SET_LOADING } from "../types";

export const getNoteById = (noteId: string, cookie?: string) => async (dispatch) => {
  try {
    const res = await handleRequest(`/notes/${noteId}`, "GET", {
      cookie,
    });

    if (isSuccess(res)) {
      dispatch({
        type: GET_NOTE_BY_ID,
        note: res.data.note,
      });
    }
  } catch (e) {
    console.error(e);

    toast.error(e?.response?.data?.error ?? NO_ERROR);
    dispatch({ type: SET_LOADING, loading: false });
  }
};
