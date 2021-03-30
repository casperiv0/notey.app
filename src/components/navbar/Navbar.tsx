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
  const [categoryId, setCategoryId] = React.useState(editingNote?.category_id);
  const [title, setTitle] = React.useState(editingNote?.title);

  React.useEffect(() => {
    updateEditingNote({
      ...editingNote,
      category_id: categoryId,
      title,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, title]);

  function handleEdit() {
    setEditing(!editing);
  }

  function handleDelete() {
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
            {editingNote && editingNote.title ? (
              editing ? (
                <>
                  <NavTitleInput
                    id="activeNoteTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </>
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
                    value={categoryId!}
                    categories={categories}
                    onChange={(e) => setCategoryId(e.target.value)}
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
