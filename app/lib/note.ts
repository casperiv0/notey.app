import { Note } from ".prisma/client";
import React from "react";
import { useLocation } from "react-router";
import { useLoaderData } from "remix";
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
