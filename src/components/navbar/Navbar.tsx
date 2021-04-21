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
import { closeModal, openModal, openSidebar } from "@lib/utils";
import Note from "types/Note";
import SelectCategory from "@components/SelectCategory";
import RightSidebar from "./RightSidebar";
import { setEditing, updateEditingNote, deleteNoteById } from "@actions/note";
import AlertModal from "@components/modals/AlertModal";
import { ModalIds } from "@lib/constants";

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
    setEditing(false);
    deleteNoteById(`${note?._id}`);

    closeModal(ModalIds.AlertDeleteNote);
  }

  return (
    <>
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
                  <Button navBtn danger onClick={() => openModal(ModalIds.AlertDeleteNote)}>
                    Delete
                  </Button>
                  <Button navBtn className="ml" onClick={handleEdit}>
                    {editing ? "Save" : "Edit"}
                  </Button>
                  <Button navBtn className="ml" onClick={() => openModal(ModalIds.ManageNoteModal)}>
                    Manage
                  </Button>
                </Row>
              </Row>
            ) : null}
          </NavLinks>
        </NavbarStyle>

        <RightSidebar />
      </NavbarContainer>

      <AlertModal
        id={ModalIds.AlertDeleteNote}
        title="Delete note"
        description={
          <>
            Are you sure you want to delete <strong>{note?.title ?? "this note"}</strong>? This
            cannot be undone!
          </>
        }
        actions={[
          {
            name: "Cancel",
            onClick: () => closeModal(ModalIds.AlertDeleteNote),
          },
          {
            danger: true,
            name: "Delete",
            onClick: handleDelete,
          },
        ]}
      />
    </>
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
