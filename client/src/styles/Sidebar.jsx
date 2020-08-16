import styled from "styled-components";
import { DARK_GRAY, WHITE, GREEN } from "./colors";

export const SidebarContainer = styled.div`
  position: relative;
  grid-area: aside;
  width: 100%;
  height: 100%;
`;

export const SidebarStyle = styled.div`
  z-index: 10;
  width: 300px;
  padding: 10px;
  position: fixed;
  background-color: ${DARK_GRAY};
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
`;

export const SidebarHeader = styled.div`
  width: 100%;
  height: 20px;
`;

export const SearchForm = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 1.2rem;
  border: 1px solid ${GREEN};
  border-right: none;
  color: ${DARK_GRAY};
`;

export const SearchBtn = styled.button`
  padding: 5px 10px;
  border: 1px solid ${GREEN};
  background-color: ${GREEN};
  color: ${WHITE};
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
`;

export const SidebarBody = styled.div`
  margin-top: 10px;
`;

export const SidebarTitle = styled.h1`
  font-size: 1.8rem;
  color: ${GREEN};
`;

export const SidebarNote = styled.a`
  cursor: pointer;
  margin-bottom: 5px;
  padding: 5px 10px;
  font-weight: 600;
  font-size: 1.2rem;
  color: ${GREEN};
  transition: background 0.2s, color 0.1s;
  text-decoration: none;
  display: block;
  background-color: ${DARK_GRAY};
  border: 1px solid ${DARK_GRAY};

  &:hover {
    color: ${DARK_GRAY};
    background-color: ${GREEN};
  }

  &.active {
    color: ${DARK_GRAY};
    background-color: ${GREEN};
  }
`;
