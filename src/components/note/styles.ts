import styled, { css } from "styled-components";
import { NoteyColors, Size } from "@lib/constants";

export const NoteStyle = styled.div<{ editing: boolean }>`
  width: 100%;
  height: calc(100% - 60px);
  grid-area: note;
  overflow: hidden;

  @media (min-width: ${Size.DefaultMinWidth}) {
    width: 100%;
  }

  ${(props) =>
    props.editing &&
    css`
      heigh: 100%;
      width: calc(100vw - 20px);
    `}
`;

export const PreviewStyle = styled.div`
  padding: 10px;
  color: ${NoteyColors.Text};
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

  & details {
    margin: 15px 0;

    & p {
      margin-left: 0.5rem;
    }
  }

  & summary {
    cursor: pointer;
    margin-bottom: 0.5rem;
    padding: 0.2rem 0.5rem;
    border-radius: 0.3rem;
    transition: background 200ms;
  }

  & summary:hover {
    background-color: ${NoteyColors.LightGray};
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
    max-width: 100%;
    background: ${NoteyColors.LightGray};
    overflow: auto;
  }

  & code {
    background: ${NoteyColors.LightGray};
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
      color: ${NoteyColors.Text};
      font-size: 1.2rem;
    }
  }
`;

export const NoteTextArea = styled.textarea`
  padding-top: 50px;
  padding: 10px;
  width: 100%;
  height: 100%;
  background: ${NoteyColors.Dark};
  color: #fff;
  resize: none;
  border: none;
  font-size: 1.2rem;

  outline: none !important;
`;
