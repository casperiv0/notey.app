import React from "react";
import {
  NavbarContainer,
  NavbarStyle,
  NavTitle,
  NavLinks,
} from "../../styles/Navbar";
import { DeleteBtn } from "../../styles/Global";

const Navbar = ({ note, deleteNote }) => {

  return (
    // todo: add edit button
    <NavbarContainer>
      <NavbarStyle>
        <NavTitle>{note && note.title}</NavTitle>
        <NavLinks>
          {
            note && note._id ? 
            <DeleteBtn onClick={() => deleteNote(note._id)}>Delete</DeleteBtn>
            : null
          }
        </NavLinks>
      </NavbarStyle>
    </NavbarContainer>
  );
};

export default Navbar;
