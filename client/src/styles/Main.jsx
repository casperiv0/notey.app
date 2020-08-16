import styled from "styled-components";
import { DARK_GRAY, GREEN } from "./colors";

export const MainStyle = styled.div`
  border-left: 1px solid ${GREEN};
  grid-area: main;
  color: white;
  position: relative;
  background-color: ${DARK_GRAY};
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 50px auto;
  grid-template-columns: repeat(1, 1fr);
  grid-template-areas:
    "nav"
    "note";
`;
