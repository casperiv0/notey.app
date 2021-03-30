import styled, { css } from "styled-components";
import { Size } from "@lib/constants";

export const NoteStyle = styled.div<{ editing: boolean }>`
  height: calc(100% - 60px);
  width: 100%;
  grid-area: note;

  @media (min-width: ${Size.DefaultMinWidth}) {
    width: 100%;
  }

  ${(props) =>
    props.editing &&
    css`
      width: calc(100vw - 20px);
    `}
`;

export const PreviewStyle = styled.div`
  padding: 10px;
  color: #f2f2f2;
  font-size: 1.2rem;

  & table,
  & th,
  & td {
    border: 2px solid #555;
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
    color: #fff;
    text-decoration: underline;
  }

  & summary {
    cursor: pointer;
    margin-bottom: 15px;
  }

  & summary:hover {
    background-color: #3a3b3c;
  }

  & h1,
  & h2 {
    border-bottom: 2px solid #555;
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
    background: #3a3b3c;
  }

  & code {
    background: #3a3b3c;
    font-family: Consolas, "Courier New", monospace !important;
    padding: 2px;
  }

  & ul {
    margin-top: 10px;
  }

  & ol {
    margin-top: 10px;
  }

  & blockquote {
    padding: 7px;
    margin: 5px 0;
    background: #3f3f3f;
    border-left: 5px solid #5f5f5f;
  }

  & li {
    margin-left: 20px;
    &::marker {
      color: #f2f2f2;
      font-size: 1.2rem;
    }
  }
`;

export const NoteTextArea = styled.textarea`
  padding-top: 50px;
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: #18191a;
  color: #fff;
  resize: none;
  border: none;
  font-size: 1.2rem;
`;
