import styled from "styled-components";

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
    color: #f2f2f2;
  }
`;

export const NotFoundTitle = styled.h1<{ error?: boolean }>`
  font-size: clamp(6rem, 20vw, 10rem);
  color: #f2f2f2;
`;

export const NotFoundBtn = styled.p`
  color: #f2f2f2;
  background-color: #2f2f2f;
  padding: 10px;
  width: 200px;
  text-align: center;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
`;
