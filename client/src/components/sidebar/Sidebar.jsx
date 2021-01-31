import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import SidebarSearch from "./SidebarSearch";
import { SrOnly } from "../../styles/Global";
import { Divider } from "../../styles/Global";
import { closeSidebar, openModal, changeFoldedState } from "../../utils/functions";
import { CloseIcon, DeleteIcon } from "../icons";
import { CategoryDiv, CategoryTitle, DeleteCategory } from "../../styles/Category";
import { deleteCategory } from "../../actions/category";
import {
  SidebarActive,
  SidebarStyle,
  SidebarHeader,
  SidebarNote,
  SidebarBody,
  CloseSidebarBtn,
} from "./sidebar.style";
import { connect } from "react-redux";

const Sidebar = ({ notes, categories, activeNote, loading, getActiveNote, deleteCategory }) => {
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const filterNotes = (filter) => {
    if (filter === "") return setFilteredNotes(notes);
    setFilteredNotes(
      notes &&
        notes.filter((note) => {
          const title = note.title.toLowerCase();
          return title.includes(filter);
        })
    );
  };

  useEffect(() => {
    if (notes) {
      setFilteredNotes(notes);
    }
  }, [notes, setFilteredNotes]);

  function setActiveNote(id) {
    getActiveNote(id);
  }

  function setFoldState(id) {
    changeFoldedState(id);
  }

  const noCategoryNotesLength = filteredNotes.filter((note) => note.category_id === "no_category");
  const noCategoryNotes =
    filteredNotes &&
    // eslint-disable-next-line
    filteredNotes.map((note, i) => {
      const isActiveNote = isActive(activeNote ? activeNote : notes[0], note);
      if (note.category_id === "no_category") {
        return (
          <SidebarNote
            onClick={() => {
              if (isActiveNote) return;
              setActiveNote(note._id);
              closeSidebar("sidebar");
            }}
            key={i}
            title={note.title}
            className={isActiveNote ? "active" : ""}
          >
            {note.title}
          </SidebarNote>
        );
      }
    });

  return (
    <>
      <SidebarStyle id="sidebar">
        <SidebarHeader>
          <SidebarSearch filterNotes={filterNotes} />
          <CloseSidebarBtn onClick={() => closeSidebar("sidebar")}>
            <SrOnly>Close Menu</SrOnly>
            <CloseIcon />
          </CloseSidebarBtn>
        </SidebarHeader>
        <SidebarBody>
          {loading ? (
            <Loader></Loader>
          ) : (
            <>
              {categories.map((cat, ci) => {
                const category = cat.name;
                const categoryNotes =
                  filteredNotes &&
                  // eslint-disable-next-line
                  filteredNotes.map((note, i) => {
                    if (note.category_id === cat._id) {
                      const isActiveNote = isActive(activeNote ? activeNote : notes[0], note);

                      return (
                        <SidebarNote
                          onClick={() => {
                            if (isActiveNote) return;
                            setActiveNote(note._id);
                            closeSidebar("sidebar");
                          }}
                          key={i}
                          title={note.title}
                          className={isActiveNote ? "active" : ""}
                        >
                          {note.title}
                        </SidebarNote>
                      );
                    }
                  });

                return (
                  <CategoryDiv id={`category-${cat._id}`} key={ci}>
                    <div style={{ display: "flex" }}>
                      <CategoryTitle title="Click to fold" onClick={() => setFoldState(cat._id)}>
                        {category}
                      </CategoryTitle>
                      <div>
                        <DeleteCategory onClick={() => deleteCategory(cat._id)}>
                          <SrOnly>Delete</SrOnly>
                          <DeleteIcon></DeleteIcon>
                        </DeleteCategory>
                      </div>
                    </div>
                    <div className="items">{categoryNotes}</div>
                  </CategoryDiv>
                );
              })}

              {/* Show all notes without no category set */}
              {notes && !noCategoryNotesLength[0] ? null : (
                <CategoryDiv id={"category-no-category"} key={categories.length}>
                  <CategoryTitle title="Click to fold" onClick={() => setFoldState("no-category")}>
                    No category
                  </CategoryTitle>
                  <div className="items">{noCategoryNotes}</div>
                </CategoryDiv>
              )}

              {/* don't show divider when no notes are found */}
              {notes && !notes[0] ? null : <Divider id="divider" />}

              <SidebarNote onClick={() => openModal("createNoteModal")}>
                Create new Note
              </SidebarNote>
              <SidebarNote onClick={() => openModal("createCategoryModal")}>
                Create new Category
              </SidebarNote>
              <SidebarNote onClick={() => openModal("optionsModal")}>Options</SidebarNote>
            </>
          )}
        </SidebarBody>
      </SidebarStyle>
      <SidebarActive onClick={() => closeSidebar("sidebar")} id="sidebarActive"></SidebarActive>
    </>
  );
};

function isActive(activeNote, note) {
  return activeNote && activeNote._id === note._id;
}

export default connect(null, { deleteCategory })(Sidebar);
