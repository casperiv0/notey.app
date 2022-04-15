import type * as React from "react";
import type { Note } from ".prisma/client";
import classNames from "classnames";
import { Link } from "@remix-run/react";
import { useActiveNote } from "~/lib/note";
import { useModal } from "~/lib/useModal";
import { Modals } from "~/lib/constants";
import { toggleSidebar } from "~/lib/utils/client.client";

interface Props {
  note: Note;
}

export const ListItem = ({ note }: Props) => {
  const { note: activeNote, editMode } = useActiveNote();
  const { openModal } = useModal();

  function handleClick(e: React.MouseEvent) {
    if (editMode) {
      e.preventDefault();
      openModal(Modals.AlertUnsavedChanges, `/app/${note.id}`);
    }

    toggleSidebar(false);
  }

  return (
    <li role="listitem">
      <Link
        onClick={handleClick}
        className={classNames(
          "block p-1 px-3 my-1 transition-colors duration-100 rounded-md hover:bg-gray-400/50 dark:hover:bg-dark-3",
          { "bg-gray-400/50 dark:bg-dark-3 font-medium": note.id === activeNote?.id },
        )}
        to={`/app/${note.id}`}
      >
        <h2 className="text-lg">{note.title}</h2>
      </Link>
    </li>
  );
};
