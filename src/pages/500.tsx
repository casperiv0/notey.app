import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { NotFoundContainer, NotFoundTitle, NotFoundBtn } from "@styles/404";

const Custom500: NextPage = () => {
  return (
    <>
      <Head>
        <title>5xx - That&apos;s an error. Please try again later</title>
      </Head>
      <NotFoundContainer>
        <NotFoundTitle>5xx</NotFoundTitle>
        <Link href="/">
          <a href="/">
            <NotFoundBtn>Return home</NotFoundBtn>
          </a>
        </Link>
      </NotFoundContainer>
    </>
  );
};

export default Custom500;
