import { useHotkeys } from "react-hotkeys-hook";
import { Modals } from "./constants";
import { useActiveNote } from "./note";
import { useModal } from "./useModal";
import { useCloneNote } from "./note";

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
