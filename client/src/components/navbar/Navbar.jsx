import React, { useEffect } from "react";
import {
  NavbarContainer,
  NavbarStyle,
  NavTitle,
  NavLinks,
  OpenSidebar,
  NavTitleInput,
} from "../../styles/Navbar";
import { DeleteBtn, EditBtn } from "../../styles/Global";
import { openSidebar } from "../../utils/functions";

const Navbar = ({
  note,
  deleteNote,
  editNote,
  editing,
  noteTitle,
  setNoteTitle,
  loading,
}) => {
  useEffect(() => {
    document.title = note ? `Notey.app - ${note.title}` : "Notey.app";

    setNoteTitle(note && note.title);
  }, [note, setNoteTitle]);

  return (
    <NavbarContainer>
      <NavbarStyle>
        <NavTitle>
          <OpenSidebar onClick={() => openSidebar("sidebar")}>
            <MenuIcon />
          </OpenSidebar>
          <NavTitleInput
            className={editing ? "active" : ""}
            onChange={(e) => setNoteTitle(e.target.value)}
            value={loading ? "" : noteTitle ? noteTitle : "No notes found"}
          />
        </NavTitle>
        <NavLinks>
          {note && note._id ? (
            <>
              <DeleteBtn onClick={() => deleteNote(note._id)}>Delete</DeleteBtn>
              <EditBtn
                onClick={() => editNote(editing ? "save" : null, note._id)}
              >
                {editing ? "Save" : "Edit"}
              </EditBtn>
            </>
          ) : null}
        </NavLinks>
      </NavbarStyle>
    </NavbarContainer>
  );
};

const MenuIcon = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className="bi bi-list"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  );
};

export default Navbar;
