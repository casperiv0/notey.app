import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import SidebarSearch from "./SidebarSearch";
import { GREEN } from "../../styles/colors";
import { closeSidebar, openModal } from "../../utils/functions";
import {
  CategoryDiv,
  CategoryTitle,
  DeleteCategory,
} from "../../styles/Category";
import { Divider } from "../../styles/Global";
import {
  SidebarActive,
  SidebarStyle,
  SidebarHeader,
  SidebarNote,
  SidebarBody,
  CloseSidebarBtn,
  SidebarFooterBg,
  SidebarFooter,
  OpenOptionsModalBtn,
} from "../../styles/Sidebar";

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
          return note.title.includes(filter);
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
            <Loader color={GREEN}></Loader>
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
                  <CategoryDiv key={ci}>
                    <CategoryTitle>
                      {category}
                      <DeleteCategory onClick={() => deleteCategory(cat._id)}>
                        <DeleteIcon></DeleteIcon>
                      </DeleteCategory>
                    </CategoryTitle>
                    {categoryNotes}
                  </CategoryDiv>
                );
              })}
              <CategoryDiv>
                <CategoryTitle>No category</CategoryTitle>
                {filteredNotes &&
                  // eslint-disable-next-line
                  filteredNotes.map((note, i) => {
                    const isActiveNote = isActive(
                      activeNote ? activeNote : notes[0],
                      note
                    );
                    if (note.category_id === "no_category") {
                      return (
                        <SidebarNote
                          onClick={() => {
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
                  })}
              </CategoryDiv>
              <Divider />
              <SidebarNote onClick={() => openModal("createNoteModal")}>
                Create new Note
              </SidebarNote>
              <SidebarNote onClick={() => openModal("createCategoryModal")}>
                Create new Category
              </SidebarNote>
            </>
          )}
        </SidebarBody>
        <SidebarFooterBg>
          <SidebarFooter>
            <OpenOptionsModalBtn onClick={() => openModal("optionsModal")}>
              Options
            </OpenOptionsModalBtn>
          </SidebarFooter>
        </SidebarFooterBg>
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

const CloseIcon = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className="bi bi-x"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
      />
      <path
        fillRule="evenodd"
        d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
      />
    </svg>
  );
};

const DeleteIcon = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className="bi bi-trash-fill"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
      />
    </svg>
  );
};

export default Sidebar;
