import styled from "styled-components";
import { NoteyColors, Size, Styles } from "lib/constants";

export const SidebarContainer = styled.div`
  grid-area: aside;
  width: ${Size.SidebarFull};
  height: 100%;
  display: none;

  @media (min-width: ${Size.DefaultMinWidth}) {
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

  @media (min-width: ${Size.DefaultMinWidth}) {
    &.active {
      display: none;
      pointer-events: none;
    }
  }
`;

export const SidebarStyle = styled.div`
  z-index: 25;
  position: fixed;
  width: ${Size.SidebarFull};
  max-width: 95%;
  padding: 10px;
  background: ${NoteyColors.DarkerGray};
  top: 0;
  left: calc(-${Size.SidebarFull} - 50px);
  bottom: 0;
  overflow-x: hidden;
  transition: left 200ms;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 40px auto 50px;

  &.active {
    width: calc(${Size.SidebarFull} + 50px);
    left: 0;
    transition: left 0.3s;
  }

  @media (min-width: ${Size.DefaultMinWidth}) {
    left: 0;
    width: ${Size.SidebarFull};
    &.active {
      width: ${Size.SidebarFull};
    }
  }
`;

export const SidebarHeader = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 85% auto;

  @media (min-width: ${Size.DefaultMinWidth}) {
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

  @media (min-width: ${Size.DefaultMinWidth}) {
    display: none;
  }

  & svg {
    fill: ${NoteyColors.Text};
  }
`;

export const SearchForm = styled.form`
  position: relative;
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: ${Styles.BorderRadius};
  padding: 2px;
  background-color: ${NoteyColors.DarkGray};
  border: 2px solid #555;
  transition: border 200ms;
  width: 100%;

  @media (hover: hover) {
    &:hover {
      border-color: rgba(255, 255, 255, 0.5);
    }
  }

  &:focus-within {
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

export const SearchInput = styled.input`
  padding: 5px;
  font-size: 1.2rem;
  border: none;
  border-right: none;
  background-color: ${NoteyColors.DarkGray};
  color: ${NoteyColors.Text};
  width: 100%;
  outline: none;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  margin-top: 10px;
  width: 98%;
`;

export const SidebarNote = styled.button`
  cursor: pointer;
  margin-bottom: 2px;
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
  border-radius: ${Styles.BorderRadius};
  width: 100%;
  background: transparent;
  border: none;
  text-align: left;

  @media (hover: hover) {
    &:hover {
      background-color: ${NoteyColors.LightGray};
    }
  }

  &:focus {
    background-color: ${NoteyColors.LightGray};
  }

  &.active {
    color: #fff;
    background-color: ${NoteyColors.LightGray};
  }
`;

export const OpenOptionsModalBtn = styled.button`
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: ${NoteyColors.DarkGray};
  color: ${NoteyColors.Text};
  border: solid ${NoteyColors.DarkGray};
  border-width: 2px 0px 2px 0px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background-color: ${NoteyColors.DarkGray};
      color: ${NoteyColors.Text};
    }
  }
`;

export const SidebarFooter = styled.div`
  position: sticky;
  bottom: -0.6rem;
  background: ${NoteyColors.DarkerGray};
  height: 105%;
  overflow: hidden;
`;
