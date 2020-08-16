import React from "react";
import { NoteStyle } from "../../styles/Notes";

const Note = ({ note }) => {
  // TODO: change to markdown area
  return (
    <NoteStyle>
      <div dangerouslySetInnerHTML={{ __html: note && note.body }} />
    </NoteStyle>
  );
};

export default Note;
