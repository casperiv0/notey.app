import { toast } from "react-toastify";
import { NO_ERROR } from "@lib/constants";
import { getErrorFromResponse, handleRequest, isSuccess, RequestData } from "@lib/fetch";
import {
  Dis,
  GetNoteById,
  UpdateNoteById,
  DeleteNoteById,
  GetAllNotes,
  CreateNote,
  SetEditing,
  UpdateEditingNote,
  PinRequired,
} from "../types";
import Note from "types/Note";

export const getNoteById = (
  noteId: string,
  share: boolean,
  cookie?: string,
  pin?: string,
) => async (dispatch: Dis<GetNoteById | PinRequired>) => {
  dispatch({ type: "SET_NOTE_LOADING", loading: true });

  try {
    const path = share === true ? `/notes/share/${noteId}` : `/notes/${noteId}`;
    const res = await handleRequest(path, "POST", {
      cookie,
      pin,
    });

    if (isSuccess(res)) {
      dispatch({
        type: "GET_NOTE_BY_ID",
        note: res.data.note,
      });

      return true;
    }

    return false;
  } catch (e) {
    const error = getErrorFromResponse(e);

    if (error === "pin_required") {
      dispatch({
        type: "PIN_REQUIRED",
        pinRequired: true,
        tempNoteId: noteId,
      });
      return;
    }

    toast.error(error);
    dispatch({ type: "SET_NOTE_LOADING", loading: false });
  }
};

export const updateNoteById = (noteId: string, data: RequestData) => async (
  dispatch: Dis<UpdateNoteById>,
) => {
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

export const deleteNoteById = (noteId: string) => async (dispatch: Dis<DeleteNoteById>) => {
  dispatch({ type: "SET_NOTE_LOADING", loading: true });

  try {
    const res = await handleRequest(`/notes/${noteId}`, "DELETE");

    if (isSuccess(res)) {
      dispatch({
        type: "DELETE_NOTE_BY_ID",
        note: res.data.notes[0],
        notes: res.data.notes,
      });

      toast.success("Successfully deleted note");
    }
  } catch (e) {
    toast.error(getErrorFromResponse(e));
    dispatch({ type: "SET_NOTE_LOADING", loading: false });
  }
};

export const getNotes = (cookie?: string) => async (dispatch: Dis<GetAllNotes>) => {
  try {
    dispatch({ type: "SET_NOTE_LOADING", loading: true });

    const res = await handleRequest("/notes", "GET", { cookie });

    if (isSuccess(res)) {
      dispatch({
        type: "GET_NOTES",
        notes: res.data.notes,
      });
    }
  } catch (e) {
    toast.error(getErrorFromResponse(e));
    dispatch({ type: "SET_NOTE_LOADING", loading: false });
  }
};

export const createNote = (data: RequestData) => async (
  dispatch: Dis<CreateNote>,
): Promise<boolean | string> => {
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
    } else {
      toast.error(res.data?.error ?? NO_ERROR);
      dispatch({ type: "SET_NOTE_LOADING", loading: false });

      return false;
    }
  } catch (e) {
    toast.error(getErrorFromResponse(e));
    dispatch({ type: "SET_NOTE_LOADING", loading: false });
    return false;
  }
};

export const setEditing = (v: boolean) => (dispatch: Dis<SetEditing>) => {
  dispatch({ type: "SET_EDITING", editing: v });
};

export const updateEditingNote = (data: Partial<Note>) => (dispatch: Dis<UpdateEditingNote>) => {
  dispatch({
    type: "UPDATE_EDITING_NOTE",
    note: data as Note,
  });
};
