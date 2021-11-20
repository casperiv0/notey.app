import type { Category, Note } from ".prisma/client";
import { CaretDownFill, Pencil } from "react-bootstrap-icons";
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
  const foldId = useId();
  const { openModal } = useModal();

  function handleClick() {
    openModal(Modals.ManageCategory, { id: categoryId, name, ...rest });
  }

  return (
    <li className="my-5" role="listitem">
      <header className="flex justify-between">
        <div className="flex items-center gap-1">
          <Button
            type="submit"
            variant="cancel"
            className="px-1 mr-0 text-dark-4 hover:text-gray-400"
            id={foldId}
            aria-label="Open or close this category"
          >
            <CaretDownFill
              aria-labelledby={foldId}
              className="mt-1 transition-colors fill-current "
            />
          </Button>
          <h1 className="text-lg font-semibold uppercase select-none">{name}</h1>
        </div>

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
