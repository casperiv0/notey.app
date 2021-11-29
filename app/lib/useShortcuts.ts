import { useHotkeys } from "react-hotkeys-hook";
import { Modals } from "./constants";
import { useActiveNote } from "./note";
import { useModal } from "./useModal";
import { useCloneNote } from "./note";
import { Note } from ".prisma/client";
import { useNavigate } from "react-router";

export function useShortcuts() {
  const { openModal } = useModal();
  const { note } = useActiveNote();
  const { handleClone } = useCloneNote();

  useHotkeys("shift+n", () => openModal(Modals.CreateNote));
  useHotkeys("shift+alt+n", (e) => {
    e.preventDefault();
    openModal(Modals.ManageCategory);
  });

  useHotkeys(
    "shift+m",
    () => {
      openModal(Modals.CreateNote, note);
    },
    [note],
  );

  useHotkeys(
    "shift+c",
    () => {
      handleClone();
    },
    [note],
  );

  useHotkeys(
    "shift+alt+d",
    () => {
      openModal(Modals.AlertDeleteNote, note);
    },
    [note],
  );

  useHotkeys("shift+a", () => openModal(Modals.ManageAccount));

  // dummy function because the app breaks if no object gets returned
  function shortcuts() {
    return true;
  }

  return { shortcuts };
}

export function useSidebarShortcuts(notes: Note[]) {
  console.log(notes);
  const { note } = useActiveNote();
  const navigate = useNavigate();

  useHotkeys(
    "shift+alt+up",
    () => {
      if (!note) return;

      const currentIndex = notes.findIndex((v) => v.id === note.id);

      if (currentIndex <= 0) {
        const lastNote = notes[notes.length - 1];
        navigate(`/app/${lastNote.id}`);
      } else {
        const newNote = notes[currentIndex - 1];
        navigate(`/app/${newNote.id}`);
      }
    },
    [notes, note],
  );

  useHotkeys(
    "shift+alt+down",
    () => {
      if (!note) return;

      const currentIndex = notes.findIndex((v) => v.id === note.id);

      if (currentIndex >= notes.length - 1) {
        const [lastNote] = notes;
        navigate(`/app/${lastNote.id}`);
      } else {
        const newNote = notes[currentIndex + 1];
        navigate(`/app/${newNote.id}`);
      }
    },
    [notes, note],
  );

  // dummy function because the app breaks if no object gets returned
  function shortcuts() {
    return true;
  }

  return { shortcuts };
}
