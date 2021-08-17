import * as React from "react";
import Link from "next/link";
import { verifyAuth } from "@actions/auth";
import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
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
import Seo from "@components/Seo";
import { useStore } from "store/StoreProvider";

const IndexPage = () => {
  const store = useStore();

  return (
    <>
      <Seo />

      <NavbarStyle>
        <NavbarContent>
          <Link href="/">
            <NavIcon href="/">Notey.app</NavIcon>
          </Link>

          <NavLinks>
            {store.isAuth ? (
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
                {store.isAuth ? (
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = ctx.req.headers.cookie;

  const auth = await verifyAuth(cookie);

  return { props: { initialState: auth } };
};

export default observer(IndexPage);
