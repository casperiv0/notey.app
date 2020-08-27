import React from "react";
import { PulseLoader } from "react-spinners";
import { PRIMARY } from "../styles/colors";

export default function Loader({ color }) {
  return (
    <PulseLoader size={10} color={color ? color : PRIMARY}></PulseLoader>
  );
}
