import styled, { css } from "styled-components";
import { PRIMARY, GREEN, RED } from "./colors";
import { SIDEBAR_WIDTH_FULL, DEFAULT_MIN_WIDTH } from "./constants";

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
  position: relative;
  padding: 7px;
  font-size: 1.2rem;
  border: 2px solid #5c5c5c;
  background-color: #2f2f2f;
  color: #f2f2f2;
  resize: vertical;
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "")};
  min-height: ${(props) => (props.minHeight ? props.minHeight : "")};
  border-radius: 5px;
  transition: border 200ms;

  &:focus {
    border-color: #fff;
  }
`;

export const Button = styled.button`
  padding: 5px 10px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 0;
  font-weight: 600;
  border-radius: 0.5rem;

  &.ml {
    margin-left: 5px;
  }

  ${(props) =>
    props.danger &&
    css`
      background-color: ${RED};
      border: 1px solid ${RED};
      color: black;
    `}

  ${(props) =>
    props.success &&
    css`
      color: ${PRIMARY};
      background-color: ${GREEN};
      border: 1px solid ${GREEN};
    `}

    ${(props) =>
    props.navBtn &&
    css`
      display: none;

      @media (min-width: ${DEFAULT_MIN_WIDTH}) {
        display: block;
      }
    `}
    
  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    padding: 7px 20px;
  }
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

export const ReportBtn = styled.a`
  text-align: center;
  padding: 7px 20px;
  margin-bottom: 10px;
  color: ${PRIMARY};
  background-color: ${GREEN};
  font-size: 1.2rem;
  cursor: pointer;
  border: 1px solid ${GREEN};
  border-radius: 0;
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
