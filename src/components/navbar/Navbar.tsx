import { connect } from "react-redux";
import * as React from "react";
import { Button, Row, SrOnly } from "@styles/Global";
import Category from "types/Category";
import State from "types/State";
import {
  NavbarContainer,
  NavbarStyle,
  NavTitle,
  NavLinks,
  OpenSidebar,
  OpenRightSidebar,
  NavTitleInput,
} from "./styles";
import MenuIcon from "@icons/MenuIcon";
import OptionsIcon from "@icons/OptionsIcon";
import { openModal, openSidebar } from "@lib/utils";
import Note from "types/Note";
import SelectCategory from "@components/SelectCategory";
import RightSidebar from "./RightSidebar";
import { setEditing, updateEditingNote, deleteNoteById } from "@actions/note";

interface Props {
  categories: Category[];
  loading: boolean;
  note: Note | null;
  editingNote: Note | null;
  editing: boolean | null;
  setEditing: (v: boolean) => void;
  updateEditingNote: (data: Partial<Note>) => void;
  deleteNoteById: (noteId: string) => void;
}

const Navbar: React.FC<Props> = ({
  categories,
  note,
  editingNote,
  editing,
  setEditing,
  updateEditingNote,
  deleteNoteById,
}) => {
  function handleEdit() {
    setEditing(!editing);
  }

  function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    const conf = confirm("Are you sure you want to deleted this note? This cannot be undone!");
    if (conf === false) return;

    setEditing(false);
    deleteNoteById(`${note?._id}`);
  }

  return (
    <NavbarContainer>
      <NavbarStyle>
        <NavTitle>
          <OpenSidebar title="Open sidebar" onClick={() => openSidebar("sidebar")}>
            <SrOnly>Menu</SrOnly>
            <MenuIcon />
          </OpenSidebar>
          <>
            <SrOnly htmlFor="activeNoteTitle">Title</SrOnly>
            {note ? (
              editing ? (
                <NavTitleInput
                  id="activeNoteTitle"
                  value={editingNote?.title}
                  onChange={(e) =>
                    updateEditingNote({
                      ...editingNote,
                      title: e.target.value,
                    })
                  }
                />
              ) : (
                <h4>{editingNote?.title}</h4>
              )
            ) : (
              "No notes found"
            )}
          </>
        </NavTitle>
        <NavLinks>
          {note && note._id ? (
            <Row>
              <OpenRightSidebar title="Open Options" onClick={() => openSidebar("right-sidebar")}>
                <SrOnly>Options</SrOnly>
                <OptionsIcon />
              </OpenRightSidebar>
              <Row>
                {editing ? (
                  <SelectCategory
                    className="is-in-nav"
                    id="activeNoteTitle"
                    value={editingNote?.category_id!}
                    categories={categories}
                    onChange={(e) =>
                      updateEditingNote({
                        ...editingNote,
                        category_id: e.target.value,
                      })
                    }
                  />
                ) : null}
                <Button navBtn danger onClick={handleDelete}>
                  Delete
                </Button>
                <Button navBtn className="ml" onClick={handleEdit}>
                  {editing ? "Save" : "Edit"}
                </Button>
                <Button navBtn className="ml" onClick={() => openModal("manageNoteModal")}>
                  Manage
                </Button>
              </Row>
            </Row>
          ) : null}
        </NavLinks>
      </NavbarStyle>

      <RightSidebar />
    </NavbarContainer>
  );
};

const mapToProps = (state: State) => ({
  loading: state.notes.loading,
  categories: state.categories.categories,
  note: state.notes.note,
  editingNote: state.notes.editingNote,
  editing: state.notes.editing,
});

export default connect(mapToProps, { setEditing, updateEditingNote, deleteNoteById })(Navbar);
