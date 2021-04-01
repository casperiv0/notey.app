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

export const CategoryTitle = styled.button`
  background: none;
  border: none;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
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

  &:hover {
    & svg {
      fill: #fff;
    }
  }

  & svg {
    transition: fill 200ms;
    fill: #aaa;
  }
`;
