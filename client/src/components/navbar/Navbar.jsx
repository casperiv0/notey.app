import React, { useEffect } from "react";
import SelectCategory from "../SelectCategory";
import { MenuIcon, CloseIcon } from "../icons";
import { Column, Row, Button } from "../../styles/Global";
import { openSidebar, closeSidebar } from "../../utils/functions";
import {
  NavbarContainer,
  NavbarStyle,
  NavTitle,
  NavLinks,
  OpenSidebar,
  NavTitleInput,
  OpenRightSidebar,
} from "./navbar.style";
import {
  RightSidebarActive,
  RightSidebarStyle,
  RightSidebarContent,
  CloseRightSidebar,
} from "./right-sidebar.style";

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
              {editing ? (
                <SelectCategory
                  id="activeNoteTitle"
                  categoryId={categoryId}
                  categories={categories}
                  setCategoryId={setCategoryId}
                />
              ) : null}
              <OpenRightSidebar onClick={() => openSidebar("right-sidebar")}>
                <MenuIcon></MenuIcon>
              </OpenRightSidebar>
              <Row>
                <Button navBtn danger onClick={() => deleteNote(note._id)}>
                  Delete
                </Button>
                <Button
                  navBtn
                  className="ml"
                  success
                  onClick={() => editNote(editing ? "save" : null, note._id)}
                >
                  {editing ? "Save" : "Edit"}
                </Button>
              </Row>
            </Row>
          ) : null}
        </NavLinks>
      </NavbarStyle>
      <RightSidebar
        note={note}
        deleteNote={deleteNote}
        editing={editing}
        editNote={editNote}
      />
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

// For smaller screen
const RightSidebar = ({ note, deleteNote, editing, editNote }) => {
  const deleteNote_ = () => {
    closeSidebar("right-sidebar");
    deleteNote(note && note._id);
  };

  const editNote_ = () => {
    closeSidebar("right-sidebar");
    editNote(editing ? "save" : null, note._id);
  };

  return (
    <>
      <RightSidebarActive
        onClick={() => closeSidebar("right-sidebar")}
        id="right-sidebarActive"
      ></RightSidebarActive>
      <RightSidebarStyle id="right-sidebar">
        <RightSidebarContent>
          <Column>
            <CloseRightSidebar onClick={() => closeSidebar("right-sidebar")}>
              <CloseIcon />
            </CloseRightSidebar>
            <Button
              style={{ marginBottom: "10px" }}
              success
              onClick={editNote_}
            >
              {editing ? "Save" : "Edit"}
            </Button>
            <Button danger onClick={deleteNote_}>
              Delete
            </Button>
          </Column>
        </RightSidebarContent>
      </RightSidebarStyle>
    </>
  );
};

export default Navbar;
