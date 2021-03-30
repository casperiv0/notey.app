import styled from "styled-components";
import { Size } from "@lib/constants";

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
  background-color: #18191a;
  border-left: none;
  border-bottom: 2px solid #666;

  @media (min-width: ${Size.DefaultMinWidth}) {
    width: calc(100% - ${Size.SidebarFull});
    left: ${Size.SidebarFull};
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

  @media (min-width: ${Size.DefaultMinWidth}) {
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

  @media (min-width: ${Size.DefaultMinWidth}) {
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

  @media (min-width: ${Size.DefaultMinWidth}) {
    display: none;
  }

  &:focus {
    outline: none;
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

  &:focus {
    outline: none;
  }

  @media (min-width: ${Size.DefaultMinWidth}) {
    display: none;
  }
`;

export const RightSidebarActive = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: none;
  pointer-events: none;
  &.active {
    display: block;
    pointer-events: all;
  }
  @media (min-width: ${Size.DefaultMinWidth}) {
    &.active {
      display: none;
      pointer-events: none;
    }
  }
`;

export const RightSidebarStyle = styled.div`
  position: fixed;
  z-index: 24;
  width: ${Size.SidebarFull};
  max-width: 95%;
  height: 100vh;
  right: -${Size.SidebarFull};
  top: 0;
  background: #252525;
  color: #f2f2f2;
  transition: right 200ms;

  &.active {
    right: 0;
  }

  @media (min-width: ${Size.DefaultMinWidth}) {
    &.active {
      right: -${Size.SidebarFull};
    }
  }
`;

export const RightSidebarContent = styled.div`
  padding: 10px;
`;

export const CloseRightSidebar = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  text-align: left;
  width: 50px;
  height: 50px;

  &:focus {
    outline: none;
  }

  & svg {
    fill: #f2f2f2;
  }
`;
