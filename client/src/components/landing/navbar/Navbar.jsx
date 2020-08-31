import React from "react";
import { NavbarStyle, NavbarContent, NavIcon, NavLinks, NavLink } from "./navbar.style";

const Navbar = () => {
  return (
    <NavbarStyle>
      <NavbarContent>
        <NavIcon href="/#/">Notey.app</NavIcon>
        <NavLinks>
          <NavLink href="/#/signin" large>Sign In</NavLink>
        </NavLinks>
      </NavbarContent>
    </NavbarStyle>
  );
};

export default Navbar;
