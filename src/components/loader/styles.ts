import styled, { css } from "styled-components";

export const Center = styled.div<{ isCenter?: boolean; fullSize?: boolean }>`
  ${(props) =>
    props.isCenter &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100vh;
    `}
  ${(props) =>
    props.fullSize &&
    css`
      z-index: 999;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #18191a;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;
