import React from "react";
import { ErrorBox, ErrorBody } from "./error-message.style";

const ErrorMessage = ({ children }) => {
  return (
    <ErrorBox>
      <ErrorBody>{children}</ErrorBody>
    </ErrorBox>
  );
};

export default ErrorMessage;