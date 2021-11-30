import { useHotkeys, Options } from "react-hotkeys-hook";
import { Modals } from "./constants";
import { useActiveNote } from "./note";
import { useModal } from "./useModal";
import { useCloneNote } from "./note";
import { Note } from ".prisma/client";
import { useNavigate } from "react-router";

const OPTIONS: Options = {
  enableOnTags: ["INPUT", "SELECT", "TEXTAREA"],
};

export function useShortcuts() {
  const { openModal } = useModal();
  const { note } = useActiveNote();
  const { handleClone } = useCloneNote();

  useHotkeys("shift+n", () => openModal(Modals.CreateNote), OPTIONS);
  useHotkeys("shift+alt+n", () => openModal(Modals.ManageCategory), OPTIONS);

  useHotkeys(
    "shift+m",
    () => {
      openModal(Modals.CreateNote, note);
    },
    OPTIONS,
    [note],
  );

  useHotkeys(
    "shift+c",
    () => {
      handleClone();
    },
    OPTIONS,
    [note],
  );

  useHotkeys(
    "shift+alt+d",
    () => {
      openModal(Modals.AlertDeleteNote, note);
    },
    OPTIONS,
    [note],
  );

  useHotkeys("shift+k", () => openModal(Modals.KeyboardShortcuts), OPTIONS);
  useHotkeys("shift+a", () => openModal(Modals.ManageAccount), OPTIONS);
  useHotkeys(
    "shift+alt+l",
    () => {
      window.location.href = "/auth/logout";
    },
    OPTIONS,
  );

  // dummy function because the app breaks if no object gets returned
  function shortcuts() {
    return true;
  }

  return { shortcuts };
}

export function useSidebarShortcuts(notes: Note[]) {
  const { note, editMode } = useActiveNote();
  const { openModal } = useModal();
  const navigate = useNavigate();

  useHotkeys(
    "shift+alt+up",
    () => {
      if (!note) return;

      const currentIndex = notes.findIndex((v) => v.id === note.id);

      if (currentIndex <= 0) {
        const lastNote = notes[notes.length - 1];
        const href = `/app/${lastNote.id}`;

        if (editMode === true) {
          return openModal(Modals.AlertUnsavedChanges, href);
        }

        navigate(href);
      } else {
        const newNote = notes[currentIndex - 1];
        const href = `/app/${newNote.id}`;

        if (editMode === true) {
          return openModal(Modals.AlertUnsavedChanges, href);
        }

        navigate(href);
      }
    },
    OPTIONS,
    [notes, note, editMode],
  );

  useHotkeys(
    "shift+alt+down",
    () => {
      if (!note) return;

      const currentIndex = notes.findIndex((v) => v.id === note.id);

      if (currentIndex >= notes.length - 1) {
        const [lastNote] = notes;
        const href = `/app/${lastNote.id}`;

        if (editMode === true) {
          return openModal(Modals.AlertUnsavedChanges, href);
        }

        navigate(href);
      } else {
        const newNote = notes[currentIndex + 1];
        const href = `/app/${newNote.id}`;

        if (editMode === true) {
          return openModal(Modals.AlertUnsavedChanges, href);
        }

        navigate(href);
      }
    },
    OPTIONS,
    [notes, note, editMode],
  );

  // dummy function because the app breaks if no object gets returned
  function shortcuts() {
    return true;
  }

  return { shortcuts };
}
