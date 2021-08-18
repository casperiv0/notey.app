import Link from "next/link";
import Head from "next/head";
import { NotFoundContainer, NotFoundTitle, NotFoundBtn } from "@styles/404";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page not found.</title>
      </Head>
      <NotFoundContainer>
        <NotFoundTitle>404</NotFoundTitle>
        <Link href="/">
          <a href="/">
            <NotFoundBtn>Return home</NotFoundBtn>
          </a>
        </Link>
      </NotFoundContainer>
    </>
  );
}
