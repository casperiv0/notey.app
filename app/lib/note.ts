import { Note } from ".prisma/client";
import React from "react";
import { useLocation } from "react-router";
import { useLoaderData } from "remix";
import create from "zustand";

const useNoteStore = create<{ note: Note | null; setNote: (n: Note | null) => void }>((set) => ({
  note: null,
  setNote: (n) => set({ note: n }),
}));

export function useActiveNote() {
  const loaderData = useLoaderData<{ note: Note | null } | null>();
  const { note, setNote } = useNoteStore();

  const location = useLocation();

  React.useEffect(() => {
    setNote(loaderData?.note ?? null);
  }, [location.pathname]);

  return { note };
}
