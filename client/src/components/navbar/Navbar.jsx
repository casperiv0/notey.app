import React from "react";
import {
  NavbarContainer,
  NavbarStyle,
  NavTitle,
  NavLinks,
} from "../../styles/Navbar";
import { DeleteBtn, EditBtn } from "../../styles/Global";
import { useEffect } from "react";

const Navbar = ({ note, deleteNote, editNote, editing }) => {
  useEffect(() => {
    document.title = note ? `Notey.app - ${note.title}` : "" + "Notey.app";
  });

  return (
    // todo: add edit button
    <NavbarContainer>
      <NavbarStyle>
        <NavTitle>{note && note.title}</NavTitle>
        <NavLinks>
          {note && note._id ? (
            <>
              <DeleteBtn onClick={() => deleteNote(note._id)}>Delete</DeleteBtn>
              <EditBtn onClick={() => editNote(editing ? "save": null, note._id)}>
                {editing ? "Save" : "Edit"}
              </EditBtn>
            </>
          ) : null}
        </NavLinks>
      </NavbarStyle>
    </NavbarContainer>
  );
};

export default Navbar;
