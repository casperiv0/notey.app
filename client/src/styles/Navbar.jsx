import styled from "styled-components";
import { PRIMARY, GREEN } from "./colors";
import { SIDEBAR_WIDTH_FULL, DEFAULT_MIN_WIDTH } from "./constants";

export const NavbarContainer = styled.div`
  grid-area: nav;
  height: 50px;
  width: 100%;
`;

export const NavbarStyle = styled.div`
  z-index: 10;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${PRIMARY};
  border-left: none;
  border-bottom: 2px solid ${GREEN};

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    width: calc(100% - ${SIDEBAR_WIDTH_FULL});
    left: ${SIDEBAR_WIDTH_FULL};
    border-left: 2px solid ${GREEN}
  }
`;

export const NavTitle = styled.div`
  margin-left: 10px;
  color: ${GREEN};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    font-size: 1.5rem;
  }
`;

export const NavTitleInput = styled.input`
  padding: 10px;
  width: 250px;
  height: 100%;
  background: none;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${GREEN};

  &:focus {
    outline: none;
  }
`;

export const NavLinks = styled.div`
  margin-right: 10px;
`;

export const OpenSidebar = styled.button`
  padding: 7px 10px 0 0;
  border: none;
  background: none;
  font-size: 2rem;
  cursor: pointer;
  display: flex;

  & svg {
    fill: ${GREEN};
  }

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    display: none;
  }
`;
