import { Note } from ".prisma/client";
import classNames from "classnames";
import { Link } from "remix";
import { useActiveNote } from "~/lib/note";

interface Props {
  note: Note;
}

export const ListItem = ({ note: { id, title } }: Props) => {
  const { note } = useActiveNote();

  return (
    <li role="listitem">
      <Link
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
