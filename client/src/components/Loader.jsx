import React from "react";
import { PulseLoader } from "react-spinners";
import { DARK_GRAY } from "../styles/colors";

export default function Loader({ color }) {
  return (
    <PulseLoader size={10} color={color ? color : DARK_GRAY}></PulseLoader>
  );
}
