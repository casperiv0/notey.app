import styled from "styled-components";
import { DARK_GRAY, GREEN } from "./colors";
import { DEFAULT_MIN_WIDTH } from "./constants";

export const NoteStyle = styled.div`
  overflow-y: scroll;
  height: 100%;
  width: calc(100vw - 1px);
  grid-area: note;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    width: 100%;
  }
`;

export const NoteTextAreaBg = styled.div`
  z-index: 15;
  position: fixed;
  left: 0;
  width: 100%;
  height: calc(100% - 2px);
  pointer-events: all;

  &.active {
    background: none;
    pointer-events: none;
  }
`;

export const NoteTextArea = styled.textarea`
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: ${DARK_GRAY};
  color: ${GREEN};
  resize: none;
  border: none;
  font-size: 1.2rem;
`;
