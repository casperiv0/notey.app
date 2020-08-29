import styled from "styled-components";
import { PRIMARY, GREEN, DARK_GRAY_2 } from "../../styles/colors";
import { DEFAULT_MIN_WIDTH } from "../../styles/constants";

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

  & table,
  & th,
  & td {
    border: 2px solid #4ecec4;
    border-collapse: collapse;
  }

  & img {
    max-width: 95%;
  }

  & th,
  & td {
    padding: 10px;
  }

  & a {
    color: #4ecec4;
    text-decoration: underline;
  }

  & summary {
    cursor: pointer;
    margin-bottom: 15px;
  }

  & summary:hover {
    background-color: #72767d;
  }

  & h1,
  & h2 {
    border-bottom: 2px solid #4ecec4;
    padding-bottom: 3px;
    margin-bottom: 10px;
    margin-top: 20px;

    &:first-child {
      margin-top: 0;
    }
  }

  & pre {
    padding: 10px;
    width: 100%;
    background: ${DARK_GRAY_2};
  }

  & code {
    background: ${DARK_GRAY_2};
    font-family: Consolas, "Courier New", monospace !important;
  }
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
