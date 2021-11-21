import { useLocation } from "react-router";
import { useFetcher } from "remix";
import { Modals } from "~/lib/constants";
import { useActiveNote } from "~/lib/note";
import { useModal } from "~/lib/useModal";
import { Button } from "../Button";
import { Input } from "../form/Input";
import { AlertModal } from "../modal/AlertModal";

export const Navbar = () => {
  const { note, editMode, setNote, setEditMode } = useActiveNote();
  const { openModal } = useModal();
  const fetcher = useFetcher();
  const location = useLocation();

  const apiUrl = `/api/note?next=${location.pathname}`;

  function handleClick() {
    if (!note) return;

    if (editMode) {
      const fd = new FormData();

      fd.set("title", note.title);
      fd.set("id", note.id);
      fd.set("body", note.body);
      fd.set("categoryId", note.categoryId ?? "null");

      // update
      fetcher.submit(fd, { action: apiUrl, method: "put" });

      setEditMode(false);
    } else {
      setEditMode(true);
    }
  }

  if (!note) {
    return null;
  }

  return (
    <header className="relative w-full h-14">
      <nav className="absolute top-0 left-0 flex items-center justify-between w-full p-4 h-14 border-b-[1.5px] border-dark-5">
        <div>
          {editMode ? (
            <Input
              onBlur={(e) => setNote({ ...note, title: e.target.value })}
              className="p-0 px-1 text-xl font-semibold border-transparent bg-dark focus:border-transparent"
              defaultValue={note.title}
            />
          ) : (
            <h1 className="text-xl font-semibold">{note.title}</h1>
          )}
        </div>

        <div>
          <Button onClick={handleClick} className="mr-2">
            {editMode ? "Save" : "Edit mode"}
          </Button>
          <Button onClick={() => openModal(Modals.CreateNote, note)} className="mr-2">
            Manage
          </Button>
          <Button onClick={() => openModal(Modals.AlertDeleteNote)} variant="danger">
            Delete
          </Button>
          <fetcher.Form method="put" action={apiUrl} />
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
