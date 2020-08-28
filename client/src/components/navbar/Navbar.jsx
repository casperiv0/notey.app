import React, { useEffect } from "react";
import SelectCategory from "../SelectCategory";
import { Row, Button } from "../../styles/Global";
import { openSidebar } from "../../utils/functions";
import { MenuIcon } from "../icons";
import {
  NavbarContainer,
  NavbarStyle,
  NavTitle,
  NavLinks,
  OpenSidebar,
  NavTitleInput,
} from "./navbar.style";

const Navbar = ({
  note,
  deleteNote,
  editNote,
  editing,
  noteTitle,
  setNoteTitle,
  categoryId,
  setCategoryId,
  categories,
}) => {
  useEffect(() => {
    document.title = note ? `Notey.app - ${note.title}` : "Notey.app";

    setNoteTitle(note && note.title);
    setCategoryId(note && note.category_id);
  }, [note, setNoteTitle, setCategoryId]);

  return (
    <NavbarContainer>
      <NavbarStyle>
        <NavTitle>
          <OpenSidebar onClick={() => openSidebar("sidebar")}>
            <MenuIcon />
          </OpenSidebar>
          <>
            <label htmlFor="activeNoteTitle" className="sr-only">
              Title
            </label>
            {note && note.title ? (
              editing ? (
                <>
                  <EditingTitleNote
                    setNoteTitle={setNoteTitle}
                    noteTitle={noteTitle}
                  />
                  <SelectCategory
                    id="activeNoteTitle"
                    categoryId={categoryId}
                    categories={categories}
                    setCategoryId={setCategoryId}
                  />
                </>
              ) : (
                <NavTitleInput
                  id="activeNoteTitle"
                  defaultValue={noteTitle}
                  readOnly
                />
              )
            ) : (
              "No notes found"
            )}
          </>
        </NavTitle>
        <NavLinks>
          {note && note._id ? (
            <Row>
              <Button danger onClick={() => deleteNote(note._id)}>
                Delete
              </Button>
              <Button
                className="ml"
                success
                onClick={() => editNote(editing ? "save" : null, note._id)}
              >
                {editing ? "Save" : "Edit"}
              </Button>
            </Row>
          ) : null}
        </NavLinks>
      </NavbarStyle>
    </NavbarContainer>
  );
};

const EditingTitleNote = ({ setNoteTitle, noteTitle }) => {
  return (
    <NavTitleInput
      id="activeNoteTitle"
      value={noteTitle}
      onChange={(e) => setNoteTitle(e.target.value)}
    />
  );
};

export default Navbar;
