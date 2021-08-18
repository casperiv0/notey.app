import { Note } from "types/Note";
import { LOCKED_NOTE_MSG, ModalIds } from "./constants";

export const isTrue = (v: string): boolean => `${v}` === "true";

export function errorObj(err: string): { error: typeof err; status: "error" } {
  return {
    error: err,
    status: "error",
  };
}

export function parseLockedNotes(notes: Note[]) {
  return notes.map((note: Note) => {
    if (note.locked === true) {
      note.body = LOCKED_NOTE_MSG;
      note.markdown = LOCKED_NOTE_MSG;
    }
    return note;
  });
}

export const openSidebar = (id: string) => {
  document.querySelector(`#${id}Active`)?.classList.add("active");
  document.querySelector(`#${id}`)?.classList.add("active");
};

export const closeSidebar = (id: string) => {
  document.querySelector(`#${id}Active`)?.classList.remove("active");
  document.querySelector(`#${id}`)?.classList.remove("active");
};

export const openModal = (id: ModalIds) => {
  document.querySelector(`#${id}`)?.classList.add("active");
  document.querySelector(`#style-${id}`)?.classList.remove("closed");
  document.querySelector(`#style-${id}`)?.classList.add("active");

  // custom event to let the modal know it was opened (for focusing on an input)
  const event = new CustomEvent("modalOpen", {
    detail: id,
  });
  window.dispatchEvent(event);
};

export const closeModal = (id: ModalIds) => {
  document.querySelector(`#style-${id}`)?.classList.replace("active", "closed");

  setTimeout(() => {
    document.querySelector(`#${id}`)?.classList.remove("active");
  }, 155);
};

export const closeAllModals = () => {
  const modals = document.querySelectorAll(".modal");

  modals.forEach((modal) => {
    modal.classList.remove("active");
  });
};

export const foldCategory = (categoryId: string) => {
  const el = document.getElementById(`category-${categoryId}`);
  if (!el) return;

  if (el.classList.contains("folded")) {
    el.classList.remove("folded");
  } else {
    el.classList.add("folded");
  }

  return el.classList.contains("folded");
};
