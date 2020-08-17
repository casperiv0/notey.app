import React from "react";
import {
  NotFoundContainer,
  NotFoundTitle,
  NotFoundBtn,
} from "../../styles/NotFound";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundBtn href="/">Return home</NotFoundBtn>
    </NotFoundContainer>
  );
};

export default NotFound;
