import React, { useEffect } from "react";
import { DeleteBtn, EditBtn } from "../../styles/Global";
import { openSidebar } from "../../utils/functions";
import { MenuIcon } from "../icons";
import { SelectCategory } from "../../styles/Category";
import {
  NavbarContainer,
  NavbarStyle,
  NavTitle,
  NavLinks,
  OpenSidebar,
  NavTitleInput,
} from "../../styles/Navbar";

const Navbar = ({
  note,
  deleteNote,
  editNote,
  editing,
  noteTitle,
  setNoteTitle,
  categoryId,
  setCategoryId,
  categories
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
          {note && note.title ? (
            editing ? (
              <>
                <EditingTitleNote
                  setNoteTitle={setNoteTitle}
                  noteTitle={noteTitle}
                />
                <SelectCategory
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="no_category">No category</option>
                  {categories &&
                    categories.map((cat, i) => {
                      return (
                        <option key={i} value={cat._id}>
                          {cat.name}
                        </option>
                      );
                    })}
                </SelectCategory>
              </>
            ) : (
              <NavTitleInput defaultValue={noteTitle} readOnly />
            )
          ) : (
            "No notes found"
          )}
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

const EditingTitleNote = ({ setNoteTitle, noteTitle }) => {
  return (
    <NavTitleInput
      value={noteTitle}
      onChange={(e) => setNoteTitle(e.target.value)}
    />
  );
};

export default Navbar;
