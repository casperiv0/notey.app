import styled from "styled-components";
import { DARK_GRAY, GREEN } from "./colors";

export const NavbarContainer = styled.div`
  grid-area: nav;
  height: 50px;
  width: 100%;
`;

export const NavbarStyle = styled.div`
  position: fixed;
  left: 300px;
  top: 0;
  width: calc(100% - 300px);
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${DARK_GRAY};
  border-bottom: 1px solid #666;
  border-left: 1px solid ${GREEN};
  border-bottom: 1px solid ${GREEN};
`;

export const NavTitle = styled.h1`
  margin-left: 10px;
  color: ${GREEN};
`;

export const NavLinks = styled.div`
  margin-right: 10px;
`