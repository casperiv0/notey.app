import type { Category, Note } from ".prisma/client";
import { CaretDownFill, Pencil } from "react-bootstrap-icons";
import { useId } from "react-aria";
import { Button } from "../Button";
import { ListItem } from "./ListItem";
import { useModal } from "~/lib/useModal";
import { Modals } from "~/lib/constants";
import { Form, useTransition } from "remix";
import { useLocation } from "react-router";
import classNames from "classnames";

interface Props {
  category: Category & { notes: Note[] };
}

export const CategoryItem = ({
  category: { id: categoryId, name, notes, folded, ...rest },
}: Props) => {
  const id = useId();
  const foldId = useId();
  const { openModal } = useModal();
  const location = useLocation();
  const { state } = useTransition();

  function handleClick() {
    openModal(Modals.ManageCategory, { id: categoryId, name, folded, ...rest });
  }

  return (
    <li className="my-5" role="listitem">
      <header className="flex justify-between">
        <div className="flex items-center gap-1">
          {categoryId !== "no_category" ? (
            <Form action={`/api/category?next=${location.pathname}`} method="patch">
              <input className="hidden" name="id" defaultValue={categoryId} />
              <Button
                type="submit"
                variant="cancel"
                className="px-1 mr-0 text-dark-4 hover:text-gray-400"
                id={foldId}
                aria-label="Open or close this category"
                name="fold_folder"
                disabled={state !== "idle"}
              >
                <CaretDownFill
                  aria-labelledby={foldId}
                  className={classNames("mt-1 fill-current transition-all", {
                    "-rotate-90": folded,
                  })}
                />
              </Button>
            </Form>
          ) : null}
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

      {folded ? null : (
        <ul className="mt-1" role="list">
          {notes.map((note) => (
            <ListItem key={note.id} note={note} />
          ))}
        </ul>
      )}
    </li>
  );
};
