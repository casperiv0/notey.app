import styled from "styled-components";
import { DARK_GRAY, GREEN, RED, WHITE } from "./colors";

export const AppLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-areas: "aside main";
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
  padding: 7px;
  font-size: 1.2rem;
  border: 1px solid ${GREEN};
  background-color: ${DARK_GRAY};
  color: ${GREEN};
  resize: vertical;
  max-height: ${props => props.maxHeight ? props.maxHeight : ""};
  min-height: ${props => props.minHeight ? props.minHeight : ""};

  &:focus {
    outline: 2px dotted ${GREEN};
  }
`;

export const DeleteBtn = styled.button`
  padding: 7px 20px;
  color: ${WHITE};
  background-color: ${RED};
  font-size: 1.2rem;
  cursor: pointer;
  border: 1px solid ${RED}
`
