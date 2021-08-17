import * as React from "react";
import { NoteTextArea } from "./styles";
import { useStore } from "store/StoreProvider";
import { observer } from "mobx-react-lite";

const NoteEditingArea = () => {
  const store = useStore();

  return (
    <NoteTextArea
      onChange={(e) => {
        store.setEditingNote({ ...store.editingNote, body: e.target.value });
      }}
      value={store.editingNote?.body}
    />
  );
};

export default observer(NoteEditingArea);
