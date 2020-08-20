import styled from "styled-components";
import { DARK_GRAY, GREEN } from "./colors";

export const AlertMessageStyle = styled.div`
  position: fixed;
  z-index: 26;
  left: 50%;
  bottom: -100%;
  min-width: 300px;
  max-width: 90%;
  background-color: ${GREEN};
  color: ${DARK_GRAY};
  font-size: 1.2rem;
  padding: 20px;
  border-radius: 10px;
  transform: translateX(-50%);
  text-transform: capitalize;
  font-weight: 600;
  text-align: center;
  transition: bottom 0.2s;

  &.active {
    bottom: 10px;
  }
`;
