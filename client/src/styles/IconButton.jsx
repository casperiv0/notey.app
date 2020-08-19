import styled from "styled-components";
import { DARK_GRAY, GREEN } from "./colors";

export const IconButtonStyle = styled.button`
  background: none;
  font-size: 1.2rem;
  border: none;
  color: ${GREEN};
  cursor: pointer;
  padding: 5px 10px;
  z-index: 5;

  & svg {
    fill: ${DARK_GRAY};
  }
`;
