import styled, { css } from "styled-components";
import { SIDEBAR_WIDTH_FULL, DEFAULT_MIN_WIDTH } from "./constants";

export const DEFAULT_INPUT_STYLES = css`
  padding: 7px;
  font-size: 1.2rem;
  border: 2px solid #5c5c5c;
  background: #2f2f2f;
  border-radius: 5px;
  color: #f2f2f2;
  transition: border 200ms;

  @media (hover: hover) {
    &:hover {
      border-color: rgba(255, 255, 255, 0.5);
    }
  }

  &:focus {
    border-color: #fff;
  }
`;

export const DEFAULT_BTN_STYLES = css`
  padding: 5px 10px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 0;
  font-weight: 600;
  border-radius: 0.5rem;
  background: ${(props) => (props.bgColor ? props.bgColor : "#555")};
  color: #f2f2f2;
  border: none;
  transition: filter 200ms;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    padding: 7px 20px;
  }

  &:hover {
    filter: brightness(120%);
  }
`;

export const AppLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 100%;
  grid-template-areas: "main";

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    grid-template-areas: "aside main";
    grid-template-columns: ${SIDEBAR_WIDTH_FULL} auto;
  }
`;

export const TextArea = styled.textarea`
  ${DEFAULT_INPUT_STYLES}
  resize: vertical;
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "")};
  min-height: ${(props) => (props.minHeight ? props.minHeight : "")};
`;

export const Button = styled.button`
  ${DEFAULT_BTN_STYLES}

  &.ml {
    margin-left: 5px;
  }

  ${(props) =>
    props.danger &&
    css`
      background-color: #d9534f;
      border: 1px solid #d9534f;
      color: black;
    `}

  ${(props) =>
    props.navBtn &&
    css`
      display: none;

      @media (min-width: ${DEFAULT_MIN_WIDTH}) {
        display: block;
      }
    `}
`;

export const Row = styled.div`
  display: flex;
`;

export const RowCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Select = styled.select`
  ${DEFAULT_INPUT_STYLES}
`;

export const ReportBtn = styled.a`
  ${DEFAULT_BTN_STYLES}
  text-align: center;
  margin-bottom: 10px;
  text-decoration: none;
  display: block;
  font-weight: 600;
`;

export const Divider = styled.div`
  padding-top: 5px;
  border-top: 2px solid ${(props) => (props.color ? props.color : "#555")};
`;

export const SrOnly = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
