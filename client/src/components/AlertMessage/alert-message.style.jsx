import styled from "styled-components";
import { PRIMARY, GREEN } from "../../styles/colors";

export const AlertMessageStyle = styled.div`
  position: fixed;
  z-index: 26;
  left: 50%;
  bottom: -100%;
  width: 350px;
  max-width: 90%;
  background-color: ${GREEN};
  color: ${PRIMARY};
  font-size: 1.2rem;
  padding: 15px 20px;
  border-radius: 10px;
  transform: translateX(-50%);
  font-weight: 600;
  text-align: center;
  transition: bottom 0.2s;
  cursor: pointer;

  &.active {
    bottom: 10px;
  }
`;
