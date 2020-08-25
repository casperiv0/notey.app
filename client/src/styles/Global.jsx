import styled from "styled-components";
import { DARK_GRAY, DARK_GRAY_2, GREEN, RED, WHITE } from "./colors";
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

export const ErrorBox = styled.div`
  background-color: ${GREEN};
  padding: 5px;
  margin-bottom: 15px;
`;

export const ErrorBody = styled.p`
  color: ${DARK_GRAY};
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
`;

export const TextArea = styled.textarea`
  position: relative;
  padding: 7px;
  font-size: 1.2rem;
  border: 2px solid ${GREEN};
  background-color: ${DARK_GRAY_2};
  color: ${GREEN};
  resize: vertical;
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "")};
  min-height: ${(props) => (props.minHeight ? props.minHeight : "")};
  border-radius: 0;

  &:focus {
    outline: 2px dotted ${GREEN};
  }
`;

export const DeleteBtn = styled.button`
  padding: 5px 10px;
  color: black;
  background-color: ${RED};
  font-size: 1.2rem;
  cursor: pointer;
  border: 1px solid ${RED};
  border-radius: 0;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    padding: 7px 20px;
  }
`;

export const EditBtn = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  color: ${DARK_GRAY};
  background-color: ${GREEN};
  font-size: 1.2rem;
  cursor: pointer;
  border: 1px solid ${GREEN};
  border-radius: 0;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    padding: 7px 20px;
  }
`;

export const ReportBtn = styled.a`
  text-align: center;
  padding: 7px 20px;
  margin-bottom: 10px;
  color: ${DARK_GRAY};
  background-color: ${GREEN};
  font-size: 1.2rem;
  cursor: pointer;
  border: 1px solid ${GREEN};
  border-radius: 0;
  text-decoration: none;
  display: block;
`;

export const Divider = styled.div`
  padding-top: 5px;
  border-top: 2px solid ${(props) => (props.color ? props.color : GREEN)};
`;
