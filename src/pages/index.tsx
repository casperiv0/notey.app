import * as React from "react";
import { connect } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import { checkAuth } from "@actions/auth";
import { GetServerSideProps, NextPage } from "next";
import { initializeStore } from "src/store/store";
import State from "types/State";
import {
  NavbarStyle,
  NavbarContent,
  NavIcon,
  NavLinks,
  NavLink,
  MainContainer,
  MainStyle,
  ShowCase,
  ShowCaseTitle,
  ShowCaseParaph,
  ShowCaseImg,
  ShowCaseLink,
  ShowCaseInfo,
  FooterStyle,
  FooterContent,
  FooterIcon,
  FooterTitle,
  FooterLinks,
  FooterLink,
} from "@styles/Landing";
import { RowCenter } from "@styles/Global";

interface Props {
  isAuth: boolean;
}

const IndexPage: NextPage<Props> = ({ isAuth }) => {
  return (
    <>
      <Head>
        <title>Notey.app - Keep track of important things</title>
        <link rel="canonical" href="https://notey.caspertheghost.me" />
        <meta property="og:url" content="https://notey.caspertheghost.me" />
        <meta property="og:title" content="Notey.app - Keep track of important things" />
      </Head>

      <NavbarStyle>
        <NavbarContent>
          <Link href="/">
            <NavIcon href="/">Notey.app</NavIcon>
          </Link>

          <NavLinks>
            {isAuth ? (
              <Link href="/app">
                <NavLink href="/app">Open App</NavLink>
              </Link>
            ) : (
              <Link href="/auth/login">
                <NavLink href="/auth/login">Login</NavLink>
              </Link>
            )}
            <Link href="/auth/register">
              <NavLink href="/auth/register" large>
                Register
              </NavLink>
            </Link>
          </NavLinks>
        </NavbarContent>
      </NavbarStyle>

      <MainContainer>
        <MainStyle>
          <ShowCase>
            <div>
              <ShowCaseTitle>Keep track of important things</ShowCaseTitle>
              <ShowCaseParaph>
                Notes app to keep track of the most important things securely and easy.
              </ShowCaseParaph>
              <RowCenter>
                {isAuth ? (
                  <Link href="/app">
                    <ShowCaseLink href="/app">Open App</ShowCaseLink>
                  </Link>
                ) : (
                  <Link href="/auth/register">
                    <ShowCaseLink href="/auth/register">Register</ShowCaseLink>
                  </Link>
                )}
                <ShowCaseInfo>Available in all latest browsers</ShowCaseInfo>
              </RowCenter>
            </div>
            <ShowCaseImg width="100%" height="100%" src="/showcase.svg" alt="Showcase" />
          </ShowCase>
        </MainStyle>
      </MainContainer>

      <FooterStyle>
        <FooterContent>
          <FooterIcon width="75px" height="75px" src="/icons/notey-app-128.svg" alt="footer-icon" />
          <FooterTitle>
            Created with ❤ by
            <a href="https://caspertheghost.me"> CasperTheGhost </a> with TypeScript ⚡
          </FooterTitle>
          <FooterLinks>
            <FooterLink href="/signup">Sign up</FooterLink>
            <FooterLink href="https://github.com/notey-app">GitHub</FooterLink>
          </FooterLinks>
        </FooterContent>
      </FooterStyle>
    </>
  );
};

const mapToProps = (state: State) => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
  note: state.notes.note,
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const store = initializeStore();
  const cookie = ctx.req.headers.cookie;

  await checkAuth(cookie)(store.dispatch);

  return { props: { initialReduxState: store.getState() } };
};

export default connect(mapToProps)(IndexPage);
