import styled from "styled-components";
import { RED, GREEN, DARK_GRAY } from "./colors";

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

export const SelectCategory = styled.select`
  padding: 10px;
  border: 2px solid ${GREEN};
  background-color: ${DARK_GRAY};
  color: ${GREEN};
  font-size: 1.2rem;
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
