import type * as React from "react";
import type { Note } from ".prisma/client";
import classNames from "classnames";
import { useLocation } from "react-router";
import { Link } from "remix";
import { useActiveNote } from "~/lib/note";
import { useModal } from "~/lib/useModal";
import { Modals } from "~/lib/constants";

interface Props {
  note: Note;
}

export const ListItem = ({ note: { id, title } }: Props) => {
  const { note, editMode } = useActiveNote();
  const { openModal } = useModal();
  const loc = useLocation();

  function handleClick(e: React.MouseEvent) {
    if (editMode === true) {
      e.preventDefault();
      openModal(Modals.AlertUnsavedChanges, `/app/${id}`);
    }
  }

  return (
    <li role="listitem">
      <Link
        onClick={handleClick}
        className={classNames(
          "block p-1 px-3 my-1 transition-colors duration-100 rounded-md hover:bg-dark-3",
          { "bg-dark-3 font-medium": id === note?.id },
        )}
        to={`/app/${id}`}
      >
        <h2 className="text-lg">{title}</h2>
      </Link>
    </li>
  );
};
