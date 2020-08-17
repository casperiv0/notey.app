import styled from "styled-components";
import { DARK_GRAY, DARK_GRAY_2, GREEN, RED, WHITE } from "./colors";
import { SIDEBAR_WIDTH_FULL, DEFAULT_MIN_WIDTH } from "./constants";

export const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const NotFoundTitle = styled.h1`
  font-size: 10rem;
  color: ${GREEN};
`;

export const NotFoundBtn = styled.a`
  color: ${DARK_GRAY};
  background-color: ${GREEN};
  padding: 10px;
  width: 200px;
  max-width: 90%;
  text-align: center;
  text-decoration: none;
  font-size: 1.2rem;
`;
