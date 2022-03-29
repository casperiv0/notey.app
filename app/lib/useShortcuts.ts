import { useHotkeys, Options } from "react-hotkeys-hook";
import { Modals } from "./constants";
import { useCloneNote, useActiveNote } from "./note";
import { useModal } from "./useModal";
import { Note } from ".prisma/client";
import { useNavigate } from "react-router";

const OPTIONS: Options = {
  enableOnTags: ["INPUT", "SELECT", "TEXTAREA"],
};

export function useShortcuts() {
  const { isModalsOpen, openModal } = useModal();
  const { note } = useActiveNote();
  const { handleClone } = useCloneNote();
  const navigate = useNavigate();

  useHotkeys("shift+n", () => !isModalsOpen && openModal(Modals.CreateNote), OPTIONS, [
    isModalsOpen,
  ]);
  useHotkeys("shift+alt+n", () => !isModalsOpen && openModal(Modals.ManageCategory), OPTIONS, [
    isModalsOpen,
  ]);

  useHotkeys(
    "shift+m",
    () => {
      !isModalsOpen && openModal(Modals.CreateNote, note);
    },
    OPTIONS,
    [note, isModalsOpen],
  );

  useHotkeys(
    "shift+c",
    () => {
      !isModalsOpen && handleClone();
    },
    OPTIONS,
    [note, isModalsOpen],
  );

  useHotkeys(
    "shift+alt+d",
    () => {
      !isModalsOpen && openModal(Modals.AlertDeleteNote, note);
    },
    OPTIONS,
    [note, isModalsOpen],
  );

  useHotkeys(
    "shift+alt+o",
    () => {
      if (!isModalsOpen && note && note.public) {
        navigate(`/share/${note.id}`);
      }
    },
    OPTIONS,
    [note, isModalsOpen],
  );

  useHotkeys("shift+k", () => !isModalsOpen && openModal(Modals.KeyboardShortcuts), OPTIONS, [
    isModalsOpen,
  ]);
  useHotkeys("shift+a", () => !isModalsOpen && openModal(Modals.ManageAccount), OPTIONS, [
    isModalsOpen,
  ]);
  useHotkeys("shift+alt+l", () => navigate("/auth/logout"), OPTIONS);

  // dummy function because the app breaks if no object gets returned
  function shortcuts() {
    return true;
  }

  return { shortcuts };
}

export function useSidebarShortcuts(notes: Note[]) {
  const { note, editMode } = useActiveNote();
  const { isModalsOpen, openModal } = useModal();
  const navigate = useNavigate();

  useHotkeys(
    "shift+alt+up",
    () => {
      if (!note || isModalsOpen) return;

      const currentIndex = notes.findIndex((v) => v.id === note.id);

      if (currentIndex <= 0) {
        const lastNote = notes[notes.length - 1];
        const href = `/app/${lastNote.id}`;

        if (editMode) {
          return openModal(Modals.AlertUnsavedChanges, href);
        }

        navigate(href);
      } else {
        const newNote = notes[currentIndex - 1];
        const href = `/app/${newNote.id}`;

        if (editMode) {
          return openModal(Modals.AlertUnsavedChanges, href);
        }

        navigate(href);
      }
    },
    OPTIONS,
    [notes, note, isModalsOpen, editMode],
  );

  useHotkeys(
    "shift+alt+down",
    () => {
      if (!note || isModalsOpen) return;

      const currentIndex = notes.findIndex((v) => v.id === note.id);

      if (currentIndex >= notes.length - 1) {
        const [lastNote] = notes;
        const href = `/app/${lastNote.id}`;

        if (editMode) {
          return openModal(Modals.AlertUnsavedChanges, href);
        }

        navigate(href);
      } else {
        const newNote = notes[currentIndex + 1];
        const href = `/app/${newNote.id}`;

        if (editMode) {
          return openModal(Modals.AlertUnsavedChanges, href);
        }

        navigate(href);
      }
    },
    OPTIONS,
    [notes, note, isModalsOpen, editMode],
  );

  // dummy function because the app breaks if no object gets returned
  function shortcuts() {
    return true;
  }

  return { shortcuts };
}
