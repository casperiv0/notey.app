import type { Note } from ".prisma/client";
import * as React from "react";
import { useActiveNote } from "~/lib/note";
import { DEFAULT_EDITOR_DATA, SlateEditor } from "../slate-editor/SlateEditor";

interface Props {
  overwrite?: {
    editMode?: boolean;
    note?: Note;
  };
}

export const Editor = ({ overwrite }: Props) => {
  const [editorValue, setEditorValue] = React.useState<any[]>(DEFAULT_EDITOR_DATA);
  const { note, editMode, setNote } = useActiveNote();

  React.useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>("#note-preview-area a").forEach((link) => {
      link.target = "_blank";
      link.rel = "noreferrer noopener";
    });
  }, [note?.body]);

  React.useEffect(() => {
    if (!note) return;
    console.log("here", { note });

    const arrValue = Array.isArray(note.body) ? note.body : [];
    setEditorValue(arrValue.length <= 0 ? DEFAULT_EDITOR_DATA : arrValue);
  }, [note]);

  if (!note) return null;

  return (
    <SlateEditor
      onChange={(v) => setNote({ ...note, body: v as any })}
      value={editorValue}
      isReadonly={!(overwrite?.editMode ?? editMode)}
    />
  );
};
