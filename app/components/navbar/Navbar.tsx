import * as React from "react";
import { useId } from "react-aria";
import { List, ThreeDots } from "react-bootstrap-icons";
import { useLocation } from "react-router";
import { useFetcher } from "@remix-run/react";
import { Modals } from "~/lib/constants";
import { useActiveNote, useCloneNote } from "~/lib/note";
import { useModal } from "~/lib/useModal";
import { toggleSidebar } from "~/lib/utils/client.client";
import { Button } from "../Button";
import { Dropdown } from "../dropdown/Dropdown";
import { Input } from "../form/Input";
import { AlertModal } from "../modal/AlertModal";

interface PrevData {
  body: any;
  title: string;
}

export const Navbar = () => {
  const [prevData, setPrevData] = React.useState<PrevData | null>(null);

  const dotsId = useId();
  const listId = useId();

  const { note, editMode, setNote, setEditMode } = useActiveNote();
  const { openModal } = useModal();
  const location = useLocation();
  const { handleClone } = useCloneNote();

  const fetcher = useFetcher();
  const cloneFetcher = useFetcher();

  const apiUrl = `/actions/note?next=${location.pathname}`;

  function handleCancel() {
    if (!note || !prevData) return;

    setNote({
      ...note,
      body: prevData.body,
      title: prevData.title,
    });

    setEditMode(false);
    setPrevData(null);
  }

  const handleClick = React.useCallback(() => {
    if (!note) return;

    if (editMode) {
      const fd = new FormData();

      fd.set("title", note.title);
      fd.set("id", note.id);
      fd.set("body", JSON.stringify(note.body));
      fd.set("categoryId", note.categoryId ?? "null");
      fd.set("isPublic", String(note.public));

      // update
      fetcher.submit(fd, { action: apiUrl, method: "put" });

      setEditMode(false);
    } else {
      setEditMode(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note, editMode]);

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        handleClick();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [handleClick]);

  React.useEffect(() => {
    if (note && prevData === null) {
      setPrevData({ body: note.body, title: note.title });
    }
  }, [note, prevData]);

  if (!note) {
    return null;
  }

  return (
    <header className="relative w-full h-14">
      <nav className="absolute top-0 left-0 flex items-center justify-between w-full p-4 h-14 border-b-[1.5px] border-gray-300 dark:border-dark-5 bg-gray-200 dark:bg-dark">
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

          {editMode ? (
            <Input
              onBlur={(e) => setNote({ ...note, title: e.target.value })}
              className="p-0 px-1 text-xl font-semibold border-transparent focus:border-transparent"
              defaultValue={note.title}
            />
          ) : (
            <h1 className="text-xl font-semibold">{note.title}</h1>
          )}
        </div>

        <div className="flex items-center">
          {editMode ? (
            <Button variant="cancel" onClick={handleCancel} className="mr-2">
              Cancel
            </Button>
          ) : null}

          <Button loading={fetcher.state !== "idle"} onClick={handleClick} className="mr-2">
            {fetcher.state !== "idle" ? "Saving.." : editMode ? "Save" : "Edit mode"}
          </Button>

          <Dropdown
            sideOffset={10}
            extra={{ maxWidth: 240 }}
            trigger={
              <Button className="px-1" variant="dropdown" id={dotsId} aria-label="More Settings">
                <ThreeDots aria-labelledby={dotsId} />
              </Button>
            }
          >
            <Dropdown.Item command="shift+c" onClick={handleClone}>
              Clone note
            </Dropdown.Item>

            <Dropdown.Item command="shift+m" onClick={() => openModal(Modals.CreateNote, note)}>
              Manage
            </Dropdown.Item>
            {note.public ? (
              <Dropdown.LinkItem command="shift+alt+o" to={`/share/${note.id}`}>
                Open public view
              </Dropdown.LinkItem>
            ) : null}
            <Dropdown.Item
              command="shift+alt+d"
              onClick={() => openModal(Modals.AlertDeleteNote)}
              variant="danger"
            >
              Delete
            </Dropdown.Item>
          </Dropdown>

          <fetcher.Form method="put" action={apiUrl} />
          <cloneFetcher.Form method="post" action={apiUrl} />
        </div>
      </nav>

      <AlertModal
        dataId={note.id}
        title="Delete Note"
        id={Modals.AlertDeleteNote}
        action="delete-/actions/note"
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
