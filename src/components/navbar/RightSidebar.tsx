import * as React from "react";
import { connect } from "react-redux";
import CloseIcon from "@components/icons/CloseIcon";
import SelectCategory from "@components/SelectCategory";
import { closeModal, closeSidebar, openModal } from "@lib/utils";
import { Button, Column, SrOnly } from "@styles/Global";
import Category from "types/Category";
import Note from "types/Note";
import State from "types/State";
import {
  RightSidebarActive,
  RightSidebarStyle,
  RightSidebarContent,
  CloseRightSidebar,
} from "./styles";
import { setEditing, updateEditingNote, deleteNoteById } from "@actions/note";
import AlertModal from "@components/modals/AlertModal";
import { ModalIds } from "@lib/constants";

interface Props {
  editing: boolean | null;
  categories: Category[];
  editingNote: Note | null;
  updateEditingNote: (data: Partial<Note>) => void;
  setEditing: (v: boolean) => void;
  deleteNoteById: (id: string) => void;
}

const RightSidebar: React.FC<Props> = ({
  editingNote,
  editing,
  categories,
  setEditing,
  updateEditingNote,
  deleteNoteById,
}) => {
  function handleDelete() {
    setEditing(false);
    deleteNoteById(`${editingNote?._id}`);

    closeModal(ModalIds.AlertDeleteNote);
  }

  const handleEdit = () => {
    setEditing(!editing);
  };

  return (
    <>
      <RightSidebarActive
        onClick={() => closeSidebar("right-sidebar")}
        id="right-sidebarActive"
      ></RightSidebarActive>

      <RightSidebarStyle id="right-sidebar">
        <RightSidebarContent>
          <Column>
            <CloseRightSidebar onClick={() => closeSidebar("right-sidebar")} title="Close Options">
              <SrOnly>Close Options</SrOnly>
              <CloseIcon />
            </CloseRightSidebar>
            <Button style={{ marginBottom: "10px" }} onClick={handleEdit}>
              {editing ? "Save" : "Edit"}
            </Button>
            {/*  onClick={shareNote} */}
            <Button style={{ marginBottom: "10px" }}>Manage</Button>
            {editing ? (
              <div style={{ marginBottom: "10px" }}>
                <SelectCategory
                  categories={categories}
                  value={editingNote?.category_id!}
                  onChange={(e) =>
                    updateEditingNote({
                      ...editingNote,
                      category_id: e.target.value,
                    })
                  }
                />
              </div>
            ) : null}
            <Button
              style={{ marginBottom: "10px" }}
              danger
              onClick={() => openModal(ModalIds.AlertDeleteNote)}
            >
              Delete
            </Button>
          </Column>
        </RightSidebarContent>
      </RightSidebarStyle>

      <AlertModal
        id={ModalIds.AlertDeleteNote}
        title="Delete note"
        description={`Are you sure you want to delete ${
          editingNote?.title ?? "this note"
        }? This cannot be undone!`}
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
  categories: state.categories.categories,
  editing: state.notes.editing,
  editingNote: state.notes.editingNote,
});

export default connect(mapToProps, { setEditing, updateEditingNote, deleteNoteById })(RightSidebar);
