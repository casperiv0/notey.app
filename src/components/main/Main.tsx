import * as React from "react";
import { MainStyle } from "./styles";
import Navbar from "@components/navbar/Navbar";
import EditingArea from "@components/note/EditingArea";
import NotePreview from "@components/note/NotePreview";
import { NoteStyle } from "@components/note/styles";
import { useStore } from "store/StoreProvider";
import { observer } from "mobx-react-lite";

const Main = () => {
  const store = useStore();

  // react.useEffect(() => {
  //   if (editing === null) return;
  //   if (editing === true) return;
  //   if (!editingNote) {
  //     toast.error(NO_ERROR);
  //     return;
  //   }

  //   if (editingNote.title.length > 40) {
  //     toast.error("Note title has a limit of 40 characters");
  //     return;
  //   }
  //   if (editingNote.title === "") {
  //     toast.error("Note title cannot be empty");
  //     return;
  //   }
  //   if (editingNote.body === "") {
  //     toast.error("Note body cannot be empty");
  //     return;
  //   }

  //   let data;
  //   if (editingNote.body.toLowerCase() !== note?.body.toLowerCase()) {
  //     data = await updateNoteById(editingNote?._id, editingNote as unknown as RequestData);
  //   }

  //   if (editingNote.title.toLowerCase() !== note?.title.toLowerCase()) {
  //     data = await updateNoteById(editingNote?._id, editingNote as unknown as RequestData);
  //   }

  //   if (editingNote.category_id !== note?.category_id) {
  //     data = await updateNoteById(editingNote?._id, editingNote as unknown as RequestData);
  //   }
  // }, [editing, editingNote, note]);

  return (
    <MainStyle>
      <Navbar />

      {store.editing ? (
        <NoteStyle editing>
          <EditingArea />
        </NoteStyle>
      ) : (
        <NotePreview note={store.note} />
      )}
    </MainStyle>
  );
};

export default observer(Main);
