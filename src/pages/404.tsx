import { NextPage } from "next";
import Link from "next/link";
import { NotFoundContainer, NotFoundTitle, NotFoundBtn } from "@styles/404";

const NotFound: NextPage = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <Link href="/app">
        <a href="/app">
          <NotFoundBtn>Return home</NotFoundBtn>
        </a>
      </Link>
    </NotFoundContainer>
  );
};

export default NotFound;
