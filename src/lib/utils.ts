import { INote } from "@models/Note.model";
import { LOCKED_NOTE_MSG } from "./constants";

export const isTrue = (v: string): boolean => `${v}` === "true";

export function errorObj(err: string): { error: typeof err; status: "error" } {
  return {
    error: err,
    status: "error",
  };
}

export function parseLockedNotes(notes: INote[]) {
  return notes.map((note: INote) => {
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

export const openModal = (id: string) => {
  document.querySelector(`#${id}`)?.classList.add("active");
  document.querySelector(`#style-${id}`)?.classList.remove("closed");
  document.querySelector(`#style-${id}`)?.classList.add("active");
};

export const closeModal = (id: string) => {
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
