import { useActiveNote } from "~/lib/note";
import { Button } from "../Button";

export const Navbar = () => {
  const { note } = useActiveNote();

  if (!note) {
    return null;
  }

  return (
    <header className="relative w-full h-15">
      <nav className="absolute top-0 left-0 flex items-center justify-between w-full p-4 h-15">
        <div>
          <h1 className="text-xl font-semibold">{note.title}</h1>
        </div>

        <div>
          <Button className="mr-2">Edit</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </nav>
    </header>
  );
};
