import { Note } from ".prisma/client";
import React from "react";
import { useLocation } from "react-router";
import { useFetcher, useLoaderData } from "remix";
import create from "zustand";

interface NoteStore {
  note: Note | null;
  setNote: (n: Note | null) => void;

  editMode: boolean;
  setEditMode: (v: boolean) => void;
}

const useNoteStore = create<NoteStore>((set) => ({
  note: null,
  setNote: (n) => set({ note: n }),

  editMode: false,
  setEditMode: (v) => set({ editMode: v }),
}));

export function useActiveNote() {
  const loaderData = useLoaderData<{ note: Note | null } | null>();
  const { note, setNote, editMode, setEditMode } = useNoteStore();

  const location = useLocation();

  React.useEffect(() => {
    setNote(loaderData?.note ?? null);
    setEditMode(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, loaderData?.note]);

  return { note, editMode, setNote, setEditMode };
}

export function useCloneNote() {
  const { note } = useActiveNote();
  const cloneFetcher = useFetcher();
  const { pathname } = useLocation();

  const apiUrl = `/api/note?next=${pathname}`;

  function handleClone() {
    if (!note) return;

    const fd = new FormData();

    fd.set("title", note.title);
    fd.set("body", note.body);
    fd.set("categoryId", note.categoryId ?? "null");
    fd.set("isPublic", String(note.public ?? false));

    cloneFetcher.submit(fd, { action: apiUrl, method: "post" });
  }

  return { handleClone };
}
