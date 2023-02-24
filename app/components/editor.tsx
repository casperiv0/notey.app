import type { Note } from "@prisma/client";
import { useActiveNote } from "~/lib/note";
import { DEFAULT_EDITOR_DATA, SlateEditor } from "./slate-editor/slate-editor";

interface Props {
  isShare?: boolean;
  overwrite?: {
    editMode?: boolean;
    note?: Note;
  };
}

export const Editor = ({ isShare, overwrite }: Props) => {
  const { note, editMode, setNote } = useActiveNote();

  if (!note) return null;

  const body = (overwrite?.note?.body ?? note.body) as any;
  const arr = Array.isArray(body)
    ? body
    : [
        {
          type: "paragraph",
          children: [{ text: body?.toString() ?? "" }],
        },
      ];
  const value = arr.length <= 0 ? DEFAULT_EDITOR_DATA : arr;

  return (
    <SlateEditor
      onChange={(v) => setNote({ ...note, body: v as any })}
      value={value}
      isReadonly={!(overwrite?.editMode ?? editMode)}
      isShare={isShare}
    />
  );
};
