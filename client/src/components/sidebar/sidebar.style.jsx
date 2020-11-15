import styled from "styled-components";
import { SIDEBAR_WIDTH_FULL, DEFAULT_MIN_WIDTH } from "../../styles/constants";

export const SidebarContainer = styled.div`
  grid-area: aside;
  width: ${SIDEBAR_WIDTH_FULL};
  height: 100%;
  display: none;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    display: block;
  }
`;

export const SidebarActive = styled.div`
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

export const SidebarStyle = styled.div`
  z-index: 25;
  position: fixed;
  width: ${SIDEBAR_WIDTH_FULL};
  max-width: 95%;
  padding: 10px;
  background-color: #252525;
  top: 0;
  left: calc(-${SIDEBAR_WIDTH_FULL} - 50px);
  bottom: 0;
  overflow-x: hidden;
  transition: left 200ms;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 40px auto 50px;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    left: 0;
    width: ${SIDEBAR_WIDTH_FULL};
  }

  &.active {
    width: calc(${SIDEBAR_WIDTH_FULL} + 50px);
    left: 0;
    transition: left 0.3s;
  }
`;

export const SidebarHeader = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 85% auto;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    grid-template-columns: auto;
  }
`;

export const CloseSidebarBtn = styled.button`
  border: none;
  background: none;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  margin-left: 10px;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    display: none;
  }

  & svg {
    fill: #f2f2f2;
  }
`;

export const SearchForm = styled.form`
  position: relative;
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 2px;
  background-color: #2f2f2f;
  border: 2px solid #555;
  transition: border 200ms;

  @media (hover: hover) {
    &:hover {
      border-color: rgba(255, 255, 255, 0.5);
    }
  }
`;

export const SearchInput = styled.input`
  padding: 5px;
  font-size: 1.2rem;
  border: none;
  border-right: none;
  background-color: #2f2f2f;
  color: #f2f2f2;
  width: 100%;
`;

export const SearchIconContainer = styled.span`
  padding: 5px;
  display: flex;
  align-items: center;

  & svg {
    font-size: 1.2rem;
    fill: #848484;
  }
`;

export const SidebarBody = styled.div`
  margin-top: 10px;
  width: 98%;
`;

export const SidebarNote = styled.a`
  cursor: pointer;
  margin-bottom: 5px;
  padding: 7px 10px;
  font-weight: 600;
  font-size: 1.2rem;
  color: #e0e0e0;
  transition: background 200ms, color 0.1s;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: none;
  border-radius: 0;
  border-radius: 5px;

  @media (hover: hover) {
    &:hover {
      background-color: #555;
    }
  }

  &.active {
    color: #fff;
    background-color: #555;
  }
`;

export const OpenOptionsModalBtn = styled.button`
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: #2f2f2f;
  color: #f2f2f2;
  border: solid #2f2f2f;
  border-width: 2px 0px 2px 0px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background-color: #2f2f2f;
      color: #f2f2f2;
    }
  }
`;
