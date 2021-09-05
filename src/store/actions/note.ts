import { toast } from "react-hot-toast";
import { NO_ERROR } from "lib/constants";
import { getErrorFromResponse, handleRequest, isSuccess, RequestData } from "lib/fetch";

export async function getShareById(noteId: string, cookie?: string) {
  try {
    const res = await handleRequest(`/notes/share/${noteId}`, "GET", {
      cookie,
    });

    if (isSuccess(res)) {
      return { note: res.data.note };
    }

    return null;
  } catch (e) {
    return { error: getErrorFromResponse(e) };
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
        pinRequired: false,
        tempNoteId: null,
      };
    }

    if (res.data.pin_required === true) {
      return {
        note: res.data.note,
        pinRequired: true,
        tempNoteId: noteId,
      };
    }

    return null;
  } catch (e) {
    const error = getErrorFromResponse(e);
    return { error };
  }
}

export async function updateNoteById(noteId: string, data: RequestData) {
  try {
    const res = await handleRequest(`/notes/${noteId}`, "PUT", data);

    if (isSuccess(res)) {
      toast.success("Note was successfully saved.");

      return {
        note: res.data.note,
        notes: res.data.notes,
        editingNote: res.data.note,
      };
    }

    return null;
  } catch (e) {
    toast.error(getErrorFromResponse(e));
    return null;
  }
}

export async function deleteNoteById(noteId: string) {
  try {
    const res = await handleRequest(`/notes/${noteId}`, "DELETE");

    if (isSuccess(res)) {
      return {
        editingNote: res.data.notes[0],
        note: res.data.notes[0],
        notes: res.data.notes,
      };
    }

    return null;
  } catch (e) {
    toast.error(getErrorFromResponse(e));
    return null;
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

    return null;
  } catch (e) {
    toast.error(getErrorFromResponse(e));
    return { error: getErrorFromResponse(e) };
  }
}

export async function createNote(data: RequestData) {
  try {
    const res = await handleRequest("/notes", "POST", data);

    if (isSuccess(res)) {
      return {
        notes: res.data.notes,
        note: res.data.note,
        noteId: res.data.note?._id,
      };
    }

    toast.error(res.data?.error ?? NO_ERROR);
    return null;
  } catch (e) {
    toast.error(getErrorFromResponse(e));
    return null;
  }
}
