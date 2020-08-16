import React from "react";
import { ErrorBox, ErrorBody } from "../styles/Global";

const ErrorMessage = ({ children }) => {
  return (
    <ErrorBox>
      <ErrorBody>{children}</ErrorBody>
    </ErrorBox>
  );
};

export default ErrorMessage;
