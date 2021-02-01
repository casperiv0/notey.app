import React from "react";
import { NavbarStyle, NavbarContent, NavIcon, NavLinks, NavLink } from "./navbar.style";

const Navbar = ({ isAuth }) => {
  return (
    <NavbarStyle>
      <NavbarContent>
        <NavIcon to="/">Notey.app</NavIcon>
        <NavLinks>
          {isAuth ? <NavLink to="/app">Open App</NavLink> : <NavLink to="/signin">Sign In</NavLink>}
          <NavLink to="/signup" large="true">
            Sign Up
          </NavLink>
        </NavLinks>
      </NavbarContent>
    </NavbarStyle>
  );
};

export default Navbar;
