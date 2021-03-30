import * as React from "react";
import { connect } from "react-redux";
import CloseIcon from "@components/icons/CloseIcon";
import SelectCategory from "@components/SelectCategory";
import { closeSidebar } from "@lib/utils";
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
  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    const conf = confirm("Are you sure you want to deleted this note? This cannot be undone!");
    if (conf === false) return;

    closeSidebar("right-sidebar");
    setEditing(false);
    deleteNoteById(editingNote?._id!);
  };

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
            <Button style={{ marginBottom: "10px" }} danger onClick={handleDelete}>
              Delete
            </Button>
          </Column>
        </RightSidebarContent>
      </RightSidebarStyle>
    </>
  );
};

const mapToProps = (state: State) => ({
  categories: state.categories.categories,
  editing: state.notes.editing,
  editingNote: state.notes.editingNote,
});

export default connect(mapToProps, { setEditing, updateEditingNote, deleteNoteById })(RightSidebar);
