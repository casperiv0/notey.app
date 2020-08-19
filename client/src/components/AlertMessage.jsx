import React from "react";
import { AlertMessageStyle } from "../styles/AlertMessage";

const AlertMessage = ({ active, message }) => {
  return <AlertMessageStyle className={active ? "active" : ""} >{message}</AlertMessageStyle>;
};

export default AlertMessage;
