import styled from "styled-components";
import { SIDEBAR_WIDTH_FULL, DEFAULT_MIN_WIDTH } from "../../styles/constants";

export const NavbarContainer = styled.div`
  grid-area: nav;
  height: 60px;
  width: 100%;
`;

export const NavbarStyle = styled.div`
  z-index: 10;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2f2f2f;
  border-left: none;
  border-bottom: 2px solid #666;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    width: calc(100% - ${SIDEBAR_WIDTH_FULL});
    left: ${SIDEBAR_WIDTH_FULL};
    border-left: 2px solid #666;
  }
`;

export const NavTitle = styled.div`
  margin-left: 10px;
  color: #f2f2f2;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    font-size: 1.5rem;

    & h4 {
      font-size: 1.5rem;
    }
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
  color: #f2f2f2;

  &:focus {
    outline: none;
  }
`;

export const NavLinks = styled.div`
  margin-right: 10px;

  &.navbar-buttons {
    & button {
      display: none;
    }
  }

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    &.navbar-buttons {
      display: block;
    }
  }
`;

export const OpenSidebar = styled.button`
  padding: 7px 10px 0 0;
  border: none;
  background: none;
  font-size: 2rem;
  cursor: pointer;
  display: flex;

  & svg {
    fill: #f2f2f2;
  }

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    display: none;
  }
`;

export const OpenRightSidebar = styled.button`
  padding: 7px 10px;
  border: none;
  background: none;
  font-size: 2rem;
  cursor: pointer;
  display: flex;

  & svg {
    fill: #f2f2f2;
  }

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    display: none;
  }
`;
