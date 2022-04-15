import type { Category, Note } from "@prisma/client";
import { CaretDownFill, Pencil } from "react-bootstrap-icons";
import { Button } from "../Button";
import { ListItem } from "./ListItem";
import { useModal } from "~/lib/useModal";
import { Modals } from "~/lib/constants";
import { Form, useTransition } from "@remix-run/react";
import { useLocation } from "react-router";
import classNames from "classnames";
import { useSSRSafeId } from "@react-aria/ssr";

interface Props {
  category: Category & { notes: Note[] };
}

export const CategoryItem = ({ category }: Props) => {
  const id = useSSRSafeId();
  const foldId = useSSRSafeId();
  const { openModal } = useModal();
  const location = useLocation();
  const { state } = useTransition();

  function handleClick() {
    openModal(Modals.ManageCategory, category);
  }

  return (
    <li className="my-5" role="listitem">
      <header className="flex justify-between">
        <div className="flex items-center gap-1">
          {category.id !== "no_category" ? (
            <Form action={`/actions/category?next=${location.pathname}`} method="patch">
              <input className="hidden" name="id" defaultValue={category.id} />
              <Button
                type="submit"
                variant="cancel"
                className="px-1 mr-0 text-gray-400/50 hover:text-gray-400 dark:text-gray-500 dark:hover:text-gray-400"
                id={foldId}
                aria-label="Open or close this category"
                name="fold_folder"
                disabled={state !== "idle"}
                value={String(category.folded)}
              >
                <CaretDownFill
                  aria-labelledby={foldId}
                  className={classNames("mt-1 fill-current transition-all", {
                    "-rotate-90": category.folded,
                  })}
                />
              </Button>
            </Form>
          ) : null}
          <h1 className="text-lg font-semibold uppercase select-none">{category.name}</h1>
        </div>

        {category.id !== "no_category" ? (
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

      {category.folded ? null : (
        <ul className="mt-1" role="list">
          {category.notes.map((note) => (
            <ListItem key={note.id} note={note} />
          ))}
        </ul>
      )}
    </li>
  );
};
