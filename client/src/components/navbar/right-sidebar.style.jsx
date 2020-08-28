import styled from "styled-components";
import { PRIMARY, GREEN } from "../../styles/colors";
import { SIDEBAR_WIDTH_FULL, DEFAULT_MIN_WIDTH } from "../../styles/constants";

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

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    &.active {
      display: none;
      pointer-events: none;
    }
  }
`;

export const RightSidebarStyle = styled.div`
  position: fixed;
  z-index: 24;
  width: ${SIDEBAR_WIDTH_FULL};
  max-width: 95%;
  height: 100vh;
  right: -${SIDEBAR_WIDTH_FULL};
  top: 0;
  background: ${PRIMARY};
  color: ${GREEN};
  transition: right 200ms;

  &.active {
    right: 0;
  }

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    &.active {
      right: -${SIDEBAR_WIDTH_FULL};
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

  & svg {
    fill: ${GREEN};
  }
`;
