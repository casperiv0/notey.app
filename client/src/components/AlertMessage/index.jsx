import React from "react";
import { AlertMessageStyle } from "./alert-message.style";

const AlertMessage = ({ active, message }) => {
  const closeAlert = () => {
    document.getElementById("alert-message").classList.remove("active");
  };

  return (
    <AlertMessageStyle
      title="Click to dismiss"
      id="alert-message"
      onClick={closeAlert}
      className={active ? "active" : ""}
    >
      {message}
    </AlertMessageStyle>
  );
};

export default AlertMessage;
