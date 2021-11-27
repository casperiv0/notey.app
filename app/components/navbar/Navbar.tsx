import { useId } from "react-aria";
import { List, ThreeDots } from "react-bootstrap-icons";
import { useLocation } from "react-router";
import { useFetcher } from "remix";
import { Modals } from "~/lib/constants";
import { useActiveNote } from "~/lib/note";
import { useModal } from "~/lib/useModal";
import { toggleSidebar } from "~/lib/utils/client.client";
import { Button } from "../Button";
import { Dropdown } from "../dropdown/Dropdown";
import { Input } from "../form/Input";
import { AlertModal } from "../modal/AlertModal";
import { UnlockLockedNoteModal } from "../modal/UnlockLockedNoteModal";

export const Navbar = () => {
  const dotsId = useId();
  const listId = useId();

  const { note, editMode, setNote, setEditMode } = useActiveNote();
  const { openModal } = useModal();
  const location = useLocation();

  const fetcher = useFetcher();
  const cloneFetcher = useFetcher();

  const apiUrl = `/api/note?next=${location.pathname}`;

  function handleClick() {
    if (!note) return;

    if (editMode) {
      const fd = new FormData();

      fd.set("title", note.title);
      fd.set("id", note.id);
      fd.set("body", note.body);
      fd.set("categoryId", note.categoryId ?? "null");
      fd.set("isPublic", String(note.public ?? false));

      // update
      fetcher.submit(fd, { action: apiUrl, method: "put" });

      setEditMode(false);
    } else {
      setEditMode(true);
    }
  }

  function handleClone() {
    if (!note) return;

    const fd = new FormData();

    fd.set("title", note.title);
    fd.set("body", note.body);
    fd.set("categoryId", note.categoryId ?? "null");
    fd.set("isPublic", String(note.public ?? false));

    fetcher.submit(fd, { action: apiUrl, method: "post" });
  }

  if (!note) {
    return null;
  }

  return (
    <header className="relative w-full h-14">
      <nav className="absolute top-0 left-0 flex items-center justify-between w-full p-4 h-14 border-b-[1.5px] border-dark-5">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => toggleSidebar()}
            variant="icon"
            id={listId}
            aria-label="Open Menu"
            className="inline-block px-1 md:hidden"
          >
            <List width={20} height={20} aria-labelledby={listId} />
          </Button>

          {editMode && !note.isLocked ? (
            <Input
              onBlur={(e) => setNote({ ...note, title: e.target.value })}
              className="p-0 px-1 text-xl font-semibold border-transparent bg-dark focus:border-transparent"
              defaultValue={note.title}
            />
          ) : (
            <h1 className="text-xl font-semibold">{note.title}</h1>
          )}
        </div>

        {note.isLocked ? (
          <div>
            <Button
              onClick={() => {
                openModal(Modals.UnLock_LockedNote, note.id);
              }}
            >
              Unlock
            </Button>

            <UnlockLockedNoteModal />
          </div>
        ) : (
          <div className="flex items-center">
            <Button loading={fetcher.state !== "idle"} onClick={handleClick} className="mr-2">
              {fetcher.state !== "idle" ? "Saving.." : editMode ? "Save" : "Edit mode"}
            </Button>

            <Dropdown
              sideOffset={10}
              extra={{ maxWidth: 200 }}
              trigger={
                <Button className="px-1" variant="dropdown" id={dotsId} aria-label="More Settings">
                  <ThreeDots aria-labelledby={dotsId} />
                </Button>
              }
            >
              <Dropdown.Item onClick={handleClone}>Clone note</Dropdown.Item>

              <Dropdown.Item onClick={() => openModal(Modals.CreateNote, note)}>
                Manage
              </Dropdown.Item>
              <Dropdown.Item onClick={() => openModal(Modals.AlertDeleteNote)} variant="danger">
                Delete
              </Dropdown.Item>
            </Dropdown>

            <fetcher.Form method="put" action={apiUrl} />
            <cloneFetcher.Form method="post" action={apiUrl} />
          </div>
        )}
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
