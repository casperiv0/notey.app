import styled from "styled-components";
import { Size } from "@lib/constants";
import { DEFAULT_INPUT_STYLES } from "./Global";

export const CategoryDiv = styled.div`
  margin: 10px 0 20px 0;

  &.folded {
    .items button {
      display: none;
    }

    margin: 5px 0;
  }
`;

export const CategoryTitleContainer = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
`;

export const CategoryTitle = styled.button<{ categoryId: string }>`
  background: none;
  border: none;
  width: 100%;
  font-weight: bold;
  cursor: ${(props) => (props.categoryId === "no_category" ? "default" : "pointer")};
  color: #f2f2f2;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
`;

export const SelectCategoryStyle = styled.select`
  ${DEFAULT_INPUT_STYLES}

  &.is-in-nav {
    margin-right: 10px;
    padding: 0;
    display: none;
  }

  @media (min-width: ${Size.DefaultMinWidth}) {
    &.is-in-nav {
      display: block;
    }
  }
`;

export const EditCategory = styled.button`
  padding: 5px 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background 200ms;

  &:hover {
    background: #3a3b3c;

    & svg {
      fill: #fff;
    }
  }

  & svg {
    transition: fill 200ms;
    fill: #aaa;
  }
`;
