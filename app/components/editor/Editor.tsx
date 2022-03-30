import type { Note } from ".prisma/client";
import * as React from "react";
import { useActiveNote } from "~/lib/note";
import { SlateEditor } from "../slate-editor/SlateEditor";

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
  }, [note?.body]);

  if (!note) return null;

  return (
    <SlateEditor
      onChange={(v) => setNote({ ...note, body: v as any })}
      value={overwrite?.note?.body ?? note.body}
      isReadonly={!(overwrite?.editMode ?? editMode)}
    />
  );
};
