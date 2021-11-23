import * as React from "react";
import { useActiveNote } from "~/lib/note";

export const Editor = () => {
  const { note, editMode, setNote } = useActiveNote();

  React.useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>("#note-preview-area a").forEach((link) => {
      link.target = "_blank";
      link.rel = "noreferrer noopener";
    });
  }, [note?.markdown]);

  if (!note) return null;

  return editMode ? (
    <textarea
      style={{ height: "calc(100vh - 3.55rem)" }}
      className="w-full px-4 py-2 bg-dark focus:outline-none"
      value={note.body}
      onChange={(e) => setNote({ ...note, body: e.target.value })}
      placeholder="Start typing.."
    />
  ) : (
    <div
      style={{ height: "calc(100vh - 3.55rem)", overflowY: "auto" }}
      className="w-full px-4 py-2 text-lg bg-dark preview-styles"
      id="note-preview-area"
      dangerouslySetInnerHTML={{ __html: note?.markdown as string }}
    />
  );
};
