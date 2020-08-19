import React from "react";
import { AlertMessageStyle } from "../styles/AlertMessage";

const AlertMessage = ({ active, message }) => {
  const closeAlert = () => {
    document.getElementById("alert-message").classList.remove("active");
  };

  return (
    <AlertMessageStyle
      id="alert-message"
      onClick={closeAlert}
      className={active ? "active" : ""}
    >
      {message}
    </AlertMessageStyle>
  );
};

export default AlertMessage;
