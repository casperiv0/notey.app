import styled from "styled-components";
import { DEFAULT_MIN_WIDTH } from "./constants";

export const CategoryDiv = styled.div`
  margin: 10px 0 20px 0;
`;

export const CategoryTitle = styled.h4`
  color: #f2f2f2;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
`;

export const SelectCategoryStyle = styled.select`
  padding: 10px;
  border: 2px solid #5c5c5c;
  background-color: #2f2f2f;
  color: #f2f2f2;
  font-size: 1.2rem;
  border-radius: 5px;

  &.is-in-nav {
    margin-right: 10px;
    padding: 0;
    display: none;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: #fff;
  }

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    &.is-in-nav {
      display: block;
    }
  }
`;

export const DeleteCategory = styled.button`
  padding: 5px 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    & svg {
      fill: #d9534f;
    }
  }

  & svg {
    transition: fill 200ms;
    fill: #aaa;
  }
`;
