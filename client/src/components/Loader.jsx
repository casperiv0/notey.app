import React from "react";
import { PulseLoader } from "react-spinners";
import styled, { css } from "styled-components";

const Center = styled.div`
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

export default function Loader({ fullSize, center, color }) {
  return (
    <Center fullSize={fullSize} isCenter={center}>
      <PulseLoader size={10} color={color ? color : "#f2f2f2"}></PulseLoader>
    </Center>
  );
}
