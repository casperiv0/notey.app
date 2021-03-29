import * as React from "react";
import Note from "types/Note";
import { NoteStyle, PreviewStyle } from "./styles";

interface Props {
  note: Note | null;
}

const NotePreview: React.FC<Props> = ({ note }) => {
  React.useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>("#note-preview-area a").forEach((link) => {
      link.target = "_blank";
      link.rel = "noreferrer noopener";
    });
  }, [note?.markdown]);

  return note?.markdown ? (
    <>
      <NoteStyle>
        <PreviewStyle
          id="note-preview-area"
          dangerouslySetInnerHTML={{ __html: note?.markdown }}
        ></PreviewStyle>
      </NoteStyle>
    </>
  ) : null;
};

export default NotePreview;
