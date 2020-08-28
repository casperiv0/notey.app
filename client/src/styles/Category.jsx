import styled from "styled-components";
import { RED, GREEN, DARK_GRAY_2 } from "./colors";
import { DEFAULT_MIN_WIDTH } from "./constants"

export const CategoryDiv = styled.div`
  color: ${GREEN};
  margin: 10px 0 20px 0;
`;

export const CategoryTitle = styled.h4`
  color: ${GREEN};
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
`;

export const SelectCategoryStyle = styled.select`
  padding: 10px;
  border: 2px solid ${GREEN};
  background-color: ${DARK_GRAY_2};
  color: ${GREEN};
  font-size: 1.2rem;

  &.is-in-nav {
    margin-right: 10px;
    padding: 0;
    display: none;
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

  & svg {
    fill: ${RED};
  }
`;

export const EditCategory = styled.button`
  padding: 5px 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;

  & svg {
    fill: ${GREEN};
  }
`;
