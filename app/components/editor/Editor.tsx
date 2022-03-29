import type { Note } from ".prisma/client";
import * as React from "react";
import { useActiveNote } from "~/lib/note";

interface Props {
  overwrite?: {
    editMode?: boolean;
    note?: Note;
  };
}

export const Editor = ({ overwrite }: Props) => {
  const { note, editMode, setNote } = useActiveNote();

  React.useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>("#note-preview-area a").forEach((link) => {
      link.target = "_blank";
      link.rel = "noreferrer noopener";
    });
  }, [note?.markdown]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    const key = event.key;

    if (key === "Enter" && (event.ctrlKey || event.metaKey)) {
      // todo
    }
  }

  if (!note) return null;

  return overwrite?.editMode ?? editMode ? (
    <textarea
      onKeyDown={handleKeyDown}
      style={{ height: "calc(100vh - 3.55rem)" }}
      className="w-full px-4 py-2 bg-gray-100 dark:bg-dark focus:outline-none"
      value={note.body}
      onChange={(e) => setNote({ ...note, body: e.target.value })}
      placeholder="Start typing.."
    />
  ) : (
    <div
      style={{ height: "calc(100vh - 3.55rem)", overflowY: "auto" }}
      className="w-full px-4 py-2 text-lg bg-gray-100 dark:bg-dark preview-styles"
      id="note-preview-area"
      dangerouslySetInnerHTML={{ __html: overwrite?.note?.markdown ?? (note.markdown as string) }}
    />
  );
};
