import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import SidebarSearch from "./SidebarSearch";
import {
  SidebarActive,
  SidebarStyle,
  SidebarHeader,
  SidebarNote,
  SidebarBody,
  SidebarTitle,
  CloseSidebarBtn,
  SidebarFooterBg,
  SidebarFooter,
  OpenOptionsModalBtn,
} from "../../styles/Sidebar";
import { GREEN } from "../../styles/colors";
import { closeSidebar, openModal } from "../../utils/functions";

const Sidebar = ({ notes, activeNote, loading, getActiveNote }) => {
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
          <SidebarTitle>All notes</SidebarTitle>
          {loading ? (
            <Loader color={GREEN}></Loader>
          ) : (
            <>
              {filteredNotes.map((note, i) => {
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
                    title={note.title}
                    className={isActiveNote ? "active" : ""}
                    key={i}
                  >
                    {note.title}
                  </SidebarNote>
                );
              })}
              <SidebarNote onClick={() => openModal("createNoteModal")}>
                Create new
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

export default Sidebar;
