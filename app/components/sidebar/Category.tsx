import type { Category, Note } from ".prisma/client";
import { Pencil } from "react-bootstrap-icons";
import { useId } from "@react-aria/utils";
import { Button } from "../Button";
import { ListItem } from "./ListItem";

interface Props {
  category: Category & { notes: Note[] };
}

export const CategoryItem = ({ category: { name, notes } }: Props) => {
  const id = useId();

  return (
    <li role="listitem">
      <header className="flex justify-between">
        <h1 className="text-lg font-semibold uppercase">{name}</h1>

        <Button className="px-1.5" variant="icon" id={id} aria-label="Manage Category">
          <Pencil aria-labelledby={id} />
        </Button>
      </header>

      <ul className="mt-3" role="list">
        {notes.map((note) => (
          <ListItem key={note.id} note={note} />
        ))}
      </ul>
    </li>
  );
};
