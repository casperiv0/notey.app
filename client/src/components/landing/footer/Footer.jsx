import React from "react";
import {
  FooterStyle,
  FooterContent,
  FooterIcon,
  FooterTitle,
  FooterLinks,
  FooterLink,
} from "./footer.style";

const Footer = () => {
  return (
    <FooterStyle>
      <FooterContent>
        <FooterIcon src="/icons/notey-app-128.svg" alt="footer-icon" />
        <FooterTitle>
          Created with ❤ by
          <a href="https://caspertheghost.me"> CasperTheGhost </a> with JavaScript
          ⚡
        </FooterTitle>
        <FooterLinks>
          <FooterLink href="/#/signup">Sign up</FooterLink>
          <FooterLink href="https://github.com/notey-app">GitHub</FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterStyle>
  );
};

export default Footer;
