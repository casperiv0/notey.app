import { Modals } from "~/lib/constants";
import { useActiveNote } from "~/lib/note";
import { useModal } from "~/lib/useModal";
import { Button } from "../Button";
import { AlertModal } from "../modal/AlertModal";

export const Navbar = () => {
  const { note } = useActiveNote();
  const { openModal } = useModal();

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
          <Button onClick={() => openModal(Modals.CreateNote, note)} className="mr-2">
            Edit
          </Button>
          <Button onClick={() => openModal(Modals.AlertDeleteNote)} variant="danger">
            Delete
          </Button>
        </div>
      </nav>

      <AlertModal
        dataId={note.id}
        title={"Delete Note"}
        id={Modals.AlertDeleteNote}
        action="delete-/api/note"
        description={
          <>
            Are you sure you want to delete <span className="font-bold">{note.title}</span>? This
            action cannot be undone.
          </>
        }
      />
    </header>
  );
};
