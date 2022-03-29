import type * as React from "react";
import type { Note } from ".prisma/client";
import classNames from "classnames";
import { Link } from "remix";
import { useActiveNote } from "~/lib/note";
import { useModal } from "~/lib/useModal";
import { Modals } from "~/lib/constants";
import { toggleSidebar } from "~/lib/utils/client.client";

interface Props {
  note: Note;
}

export const ListItem = ({ note: { id, title } }: Props) => {
  const { note, editMode } = useActiveNote();
  const { openModal } = useModal();

  function handleClick(e: React.MouseEvent) {
    if (editMode) {
      e.preventDefault();
      openModal(Modals.AlertUnsavedChanges, `/app/${id}`);
    }

    toggleSidebar(false);
  }

  return (
    <li role="listitem">
      <Link
        onClick={handleClick}
        className={classNames(
          "block p-1 px-3 my-1 transition-colors duration-100 rounded-md hover:bg-gray-400/50 dark:hover:bg-dark-3",
          { "bg-gray-400/50 dark:bg-dark-3 font-medium": id === note?.id },
        )}
        to={`/app/${id}`}
      >
        <h2 className="text-lg">{title}</h2>
      </Link>
    </li>
  );
};
