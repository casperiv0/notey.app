import styled from "styled-components";
import { DEFAULT_MIN_WIDTH } from "../../styles/constants";

export const MainStyle = styled.div`
  border-left: none;
  grid-area: main;
  color: white;
  position: relative;
  background-color: #2f2f2f;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 50px auto;
  grid-template-columns: repeat(1, 1fr);
  grid-template-areas:
    "nav"
    "note";

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    border-left: 2px solid #666;
  }
`;
