import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import SidebarSearch from "./SidebarSearch";
import { SrOnly } from "../../styles/Global";
import { Divider } from "../../styles/Global";
import { closeSidebar, openModal } from "../../utils/functions";
import { CloseIcon, DeleteIcon } from "../icons";
import {
  CategoryDiv,
  CategoryTitle,
  DeleteCategory,
} from "../../styles/Category";
import {
  SidebarActive,
  SidebarStyle,
  SidebarHeader,
  SidebarNote,
  SidebarBody,
  CloseSidebarBtn,
} from "./sidebar.style";

const Sidebar = ({
  notes,
  categories,
  activeNote,
  loading,
  getActiveNote,
  deleteCategory,
}) => {
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

  const setActiveNote = (id) => {
    getActiveNote(id);
  };

  const noCategoryNotesLength = filteredNotes.filter(
    (note) => note.category_id === "no_category"
  );
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
                      const isActiveNote = isActive(
                        activeNote ? activeNote : notes[0],
                        note
                      );

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
                  <CategoryDiv id={`category-${ci}`} key={ci}>
                    <CategoryTitle>
                      {category}
                      <div>
                        <DeleteCategory onClick={() => deleteCategory(cat._id)}>
                          <SrOnly>Delete</SrOnly>
                          <DeleteIcon></DeleteIcon>
                        </DeleteCategory>
                      </div>
                    </CategoryTitle>
                    {categoryNotes}
                  </CategoryDiv>
                );
              })}

              {/* Show all notes without no category set */}
              {notes && !noCategoryNotesLength[0] ? null : (
                <CategoryDiv
                  id={`category-${categories.length}`}
                  key={categories.length}
                >
                  <CategoryTitle>No category</CategoryTitle>
                  {noCategoryNotes}
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
              <SidebarNote onClick={() => openModal("optionsModal")}>
                Options
              </SidebarNote>
            </>
          )}
        </SidebarBody>
      </SidebarStyle>
      <SidebarActive
        onClick={() => closeSidebar("sidebar")}
        id="sidebarActive"
      ></SidebarActive>
    </>
  );
};

function isActive(activeNote, note) {
  return activeNote && activeNote._id === note._id;
}

export default Sidebar;
