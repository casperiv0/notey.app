import styled from "styled-components";
import { DARK_GRAY, GREEN } from "./colors";

export const NoteStyle = styled.div`
  overflow-y: scroll;
  height: 100%;
  grid-area: note;
  font-size: 1.2rem;
`;

export const NoteTextArea = styled.textarea`
  padding: 10px 30px;
  width: 100%;
  height: 100%;
  background-color: ${DARK_GRAY};
  color: ${GREEN};
  resize: none;
  border: none;
`;
