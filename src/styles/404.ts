import styled from "styled-components";
import { NoteyColors } from "lib/constants";

export const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  p {
    text-align: center;
    font-size: clamp(1.5rem, 8vw, 3rem);
    color: ${NoteyColors.Text};
  }
`;

export const NotFoundTitle = styled.h1<{ error?: boolean }>`
  font-size: clamp(6rem, 20vw, 10rem);
  color: ${NoteyColors.Text};
`;

export const NotFoundBtn = styled.p`
  color: ${NoteyColors.Text};
  background: ${NoteyColors.DarkGray};
  padding: 1rem 2rem;
  width: 100%;
  border-radius: 0.5rem;
  text-align: center;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
`;
