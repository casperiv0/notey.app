import styled from "styled-components";
import { Size } from "@lib/constants";

export const MainStyle = styled.div`
  border-left: none;
  grid-area: main;
  color: white;
  position: relative;
  background-color: #18191a;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 60px auto;
  grid-template-columns: repeat(1, 1fr);

  grid-template-areas:
    "nav"
    "note";

  @media (min-width: ${Size.DefaultMinWidth}) {
    border-left: 2px solid #666;
  }
`;
