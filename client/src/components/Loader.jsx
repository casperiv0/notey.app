import React from "react";
import { PulseLoader } from "react-spinners";
import { PRIMARY } from "../styles/colors";
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
`;

export default function Loader({ center, color }) {
  return (
    <Center isCenter={center}>
      <PulseLoader size={10} color={color ? color : PRIMARY}></PulseLoader>
    </Center>
  );
}
