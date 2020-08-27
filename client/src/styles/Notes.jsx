import styled from "styled-components";
import { PRIMARY, GREEN } from "./colors";
import { DEFAULT_MIN_WIDTH } from "./constants";

export const NoteStyle = styled.div`
  height: 100%;
  width: calc(100vw - 20px);
  grid-area: note;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    width: 100%;
  }
`;

export const NotePreview = styled.div`
  padding: 10px;
  color: ${GREEN};
  font-size: 1.2rem;
`;

export const NoteTextArea = styled.textarea`
  padding-top: 50px;
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: ${PRIMARY};
  color: ${GREEN};
  resize: none;
  border: none;
  font-size: 1.2rem;
`;
