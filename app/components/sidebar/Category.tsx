import type { Category, Note } from ".prisma/client";
import { Pencil } from "react-bootstrap-icons";
import { useId } from "@react-aria/utils";
import { Button } from "../Button";
import { ListItem } from "./ListItem";
import { useModal } from "~/lib/useModal";
import { Modals } from "~/lib/constants";

interface Props {
  category: Category & { notes: Note[] };
}

export const CategoryItem = ({ category: { id: categoryId, name, notes, ...rest } }: Props) => {
  const id = useId();
  const { openModal } = useModal();

  function handleClick() {
    openModal(Modals.ManageCategory, { id: categoryId, name, ...rest });
  }

  return (
    <li className="my-2" role="listitem">
      <header className="flex justify-between">
        <h1 className="text-lg font-semibold uppercase">{name}</h1>

        {categoryId !== "no_category" ? (
          <Button
            onClick={handleClick}
            className="px-1.5"
            variant="icon"
            id={id}
            aria-label="Manage Category"
          >
            <Pencil aria-labelledby={id} />
          </Button>
        ) : null}
      </header>

      <ul className="mt-1" role="list">
        {notes.map((note) => (
          <ListItem key={note.id} note={note} />
        ))}
      </ul>
    </li>
  );
};
