import { Note } from ".prisma/client";
import classNames from "classnames";
import { Link } from "remix";
import { useActiveNote } from "~/lib/note";

interface Props {
  note: Note;
}

export const ListItem = ({ note: { id, body, title } }: Props) => {
  const sliced = "This is a cool note, not all the text fits on this sidebarItem".substr(0, 45);
  const { note } = useActiveNote();

  return (
    <li role="listitem">
      <Link
        className={classNames(
          "block p-2 my-1 transition-colors duration-100 rounded-md hover:bg-gray-200",
          { "bg-gray-200 font-medium": id === note?.id },
        )}
        to={`/app/${id}`}
      >
        <h2 className="mb-1 text-xl font-medium">{title}</h2>
        <p className="text-base">
          {sliced}
          {sliced.length < body.length ? "..." : null}
        </p>
      </Link>
    </li>
  );
};
