import React from "react";
import {
  NavbarStyle,
  NavbarContent,
  NavIcon,
  NavLinks,
  NavLink,
} from "./navbar.style";

const Navbar = ({ isAuth }) => {
  return (
    <NavbarStyle>
      <NavbarContent>
        <NavIcon href="/">Notey.app</NavIcon>
        <NavLinks>
          {isAuth ? (
            <NavLink href="/app">Open App</NavLink>
          ) : (
            <NavLink href="/signin">Sign In</NavLink>
          )}
          <NavLink href="/signup" large>
            Sign Up
          </NavLink>
        </NavLinks>
      </NavbarContent>
    </NavbarStyle>
  );
};

export default Navbar;
