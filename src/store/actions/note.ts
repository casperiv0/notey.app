import { toast } from "react-toastify";
import { NO_ERROR } from "@lib/constants";
import { getErrorFromResponse, handleRequest, isSuccess, RequestData } from "@lib/fetch";
import { Dis, UpdateNoteById, CreateNote } from "../types";

export async function getShareById(noteId: string, cookie?: string) {
  try {
    const res = await handleRequest(`/notes/share/${noteId}`, "GET", {
      cookie,
    });

    if (isSuccess(res)) {
      return { note: res.data.note };
    }
  } catch (e) {
    return { error: e.message };
  }
}

export async function getNoteById(noteId: string, cookie?: string, pin?: string) {
  try {
    const res = await handleRequest(`/notes/${noteId}`, "POST", {
      cookie,
      pin,
    });

    if (isSuccess(res)) {
      return {
        note: res.data.note ?? null,
        editingNote: res.data.note ?? null,
      };
    }

    if (res.data.pin_required === true) {
      return {
        note: res.data.note,
        pinRequired: true,
        tempNoteId: noteId,
      };
    }

    return {};
  } catch (e) {
    const error = getErrorFromResponse(e);
    return { error };
  }
}

export const updateNoteById =
  (noteId: string, data: RequestData) => async (dispatch: Dis<UpdateNoteById>) => {
    dispatch({ type: "SET_NOTE_LOADING", loading: true });

    try {
      const res = await handleRequest(`/notes/${noteId}`, "PUT", data);

      if (isSuccess(res)) {
        dispatch({
          type: "UPDATE_NOTE_BY_ID",
          note: res.data.note,
          notes: res.data.notes,
        });

        toast.success("Successfully updated note");
      }
    } catch (e) {
      toast.error(getErrorFromResponse(e));
      dispatch({ type: "SET_NOTE_LOADING", loading: false });
    }
  };

export async function deleteNoteById(noteId: string) {
  try {
    const res = await handleRequest(`/notes/${noteId}`, "DELETE");

    if (isSuccess(res)) {
      return {
        note: res.data.notes[0],
        notes: res.data.notes,
      };
    }
  } catch (e) {
    toast.error(getErrorFromResponse(e));
  }
}

export async function getNotes(cookie?: string) {
  try {
    const res = await handleRequest("/notes", "GET", { cookie });

    if (isSuccess(res)) {
      return {
        notes: res.data.notes,
      };
    }
  } catch (e) {
    toast.error(getErrorFromResponse(e));
    return { error: getErrorFromResponse(e) };
  }
}

export const createNote =
  (data: RequestData) =>
  async (dispatch: Dis<CreateNote>): Promise<boolean | string> => {
    dispatch({ type: "SET_NOTE_LOADING", loading: true });

    try {
      const res = await handleRequest("/notes", "POST", data);

      if (isSuccess(res)) {
        dispatch({
          type: "CREATE_NOTE",
          notes: res.data.notes,
          note: res.data.note,
        });

        return res.data.note?._id;
      }

      toast.error(res.data?.error ?? NO_ERROR);
      dispatch({ type: "SET_NOTE_LOADING", loading: false });

      return false;
    } catch (e) {
      toast.error(getErrorFromResponse(e));
      dispatch({ type: "SET_NOTE_LOADING", loading: false });
      return false;
    }
  };
