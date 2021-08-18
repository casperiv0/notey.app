import * as React from "react";
import { observer } from "mobx-react-lite";
import { MainStyle } from "./styles";
import Navbar from "@components/navbar/Navbar";
import EditingArea from "@components/note/EditingArea";
import NotePreview from "@components/note/NotePreview";
import { NoteStyle } from "@components/note/styles";
import { useStore } from "store/StoreProvider";

const Main = () => {
  const store = useStore();

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
