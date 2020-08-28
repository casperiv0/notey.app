import React from "react";
import {
  NotFoundContainer,
  NotFoundTitle,
  NotFoundBtn,
} from "./not-found.style";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <Link to="/">
        <NotFoundBtn>Return home</NotFoundBtn>
      </Link>
    </NotFoundContainer>
  );
};

export default NotFound;
