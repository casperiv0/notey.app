import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
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

const noCategory = {
  name: "No Category",
  _id: "no_category",
};

const Sidebar = ({ notes, categories, activeNote, loading, getActiveNote, deleteCategory }) => {
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const filterNotes = (filter) => {
    if (filter === "") return setFilteredNotes(notes);
    setFilteredNotes(
      notes &&
        notes.filter((note) => {
          const title = note.title.toLowerCase();
          return title.includes(filter);
        }),
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
              {[...categories, noCategory].map((cat, ci) => {
                const category = cat.name;
                const categoryNotes = filteredNotes?.filter((note) => {
                  return note.category_id === cat._id;
                });
                if (categoryNotes.length <= 0) return null;

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
                    <div className="items">
                      {categoryNotes?.map((note, i) => {
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
                        } else {
                          return null;
                        }
                      })}
                    </div>
                  </CategoryDiv>
                );
              })}

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
