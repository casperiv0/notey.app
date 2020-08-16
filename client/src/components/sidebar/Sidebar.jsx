import React from "react";
import {
  SidebarStyle,
  SidebarHeader,
  SidebarNote,
  SidebarBody,
  SidebarTitle,
} from "../../styles/Sidebar";
import SidebarSearch from "./SidebarSearch";
import Loader from "../../components/Loader";
import { GREEN } from "../../styles/colors";

const Sidebar = ({ notes, activeNote, loading }) => {
  const filterNotes = (filter) => {};
  const createNew = () => {
    document.querySelector("#createNoteModal").classList.add("active");
    document.querySelector("#createNoteModalBg").classList.add("active");
  };

  return (
    <SidebarStyle>
      <SidebarHeader>
        <SidebarSearch filterNotes={filterNotes} />
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
                  href={`/?noteId=${note._id}`}
                  className={isActiveNote ? "active" : ""}
                  key={i}
                >
                  {note.title}
                </SidebarNote>
              );
            })}
            <SidebarNote onClick={createNew} href="#create">
              Create new
            </SidebarNote>
          </>
        )}
      </SidebarBody>
    </SidebarStyle>
  );
};

function isActive(activeNote, note) {
  return activeNote._id === note._id;
}

export default Sidebar;
