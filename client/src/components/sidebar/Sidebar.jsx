import React from "react";
import Loader from "../../components/Loader";
import SidebarSearch from "./SidebarSearch";
import IconButton from "../IconButton.jsx";
import {
  SidebarActive,
  SidebarStyle,
  SidebarHeader,
  SidebarNote,
  SidebarBody,
  SidebarTitle,
  CloseSidebarBtn,
} from "../../styles/Sidebar";
import { GREEN } from "../../styles/colors";
import { closeSidebar } from "../../utils/functions";

const Sidebar = ({ notes, activeNote, loading, deleteNote }) => {
  const filterNotes = (filter) => {};

  const createNew = () => {
    document.querySelector("#createNoteModal").classList.add("active");
    document.querySelector("#createNoteModalBg").classList.add("active");
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
              {notes.map((note, i) => {
                const isActiveNote = isActive(
                  activeNote ? activeNote : notes[0],
                  note
                );
                return (
                  <SidebarNote
                    title={note.title}
                    href={`/?noteId=${note._id}`}
                    className={isActiveNote ? "active" : ""}
                    key={i}
                  >
                    {note.title}
                    {/* TODO: get button clickable */}
                    <IconButton onClick={() => deleteNote(note._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </SidebarNote>
                );
              })}
              <SidebarNote onClick={createNew}>Create new</SidebarNote>
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
  return activeNote._id === note._id;
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
