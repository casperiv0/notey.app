import * as React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Note from "types/Note";
import State from "types/State";
import { deleteCategory } from "@actions/categories";
import { closeModal, closeSidebar, openModal } from "@lib/utils";
import {
  SidebarActive,
  SidebarStyle,
  SidebarHeader,
  SidebarNote,
  SidebarBody,
  CloseSidebarBtn,
} from "./styles";
import { SrOnly, Divider } from "@styles/Global";
import SidebarSearch from "./SidebarSearch";
import CloseIcon from "@icons/CloseIcon";
import DeleteIcon from "@icons/DeleteIcon";
import Category from "types/Category";
import { CategoryDiv, CategoryTitle, DeleteCategory } from "../../styles/Category";
import AlertModal from "@components/modals/AlertModal";
import { ModalIds } from "@lib/constants";

interface Props {
  notes: Note[];
  activeNote: Note | null;
  categories: Category[];
  editing: boolean | null;
  deleteCategory: (id: string) => void;
}

const noCategory = {
  name: "No Category",
  _id: "no_category",
};

const Sidebar: React.FC<Props> = ({ notes, categories, activeNote, editing, deleteCategory }) => {
  const [filteredNotes, setFilteredNotes] = React.useState(notes);
  const [tempId, setTempId] = React.useState<string | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  const setActiveNote = (id: string, force = editing) => {
    if (force) {
      setTempId(id);
      return openModal(ModalIds.AlertUnsavedChanges);
    }

    closeModal(ModalIds.AlertUnsavedChanges);
    setTempId(null);

    router.push({
      href: "/app",
      query: {
        noteId: id,
      },
    });
  };

  const filterNotes = (filter: string) => {
    if (filter === "") return setFilteredNotes(notes);
    setFilteredNotes(
      notes &&
        notes.filter((note) => {
          const title = note.title.toLowerCase();
          return title.includes(filter);
        }),
    );
  };

  const handleDelete = (id: string) => () => {
    deleteCategory(id);
  };

  return (
    <>
      <SidebarStyle id="sidebar">
        <SidebarHeader>
          <SidebarSearch filterNotes={filterNotes} />
          <CloseSidebarBtn onClick={() => closeSidebar("sidebar")}>
            <SrOnly>Close Menu</SrOnly>
            <CloseIcon />
          </CloseSidebarBtn>
        </SidebarHeader>

        <SidebarBody>
          <>
            {[...categories, noCategory].map((cat, ci) => {
              const category = cat.name;
              const categoryNotes = filteredNotes?.filter((note) => {
                return note.category_id === cat._id;
              });
              if (categoryNotes.length <= 0) return null;

              return (
                <CategoryDiv id={`category-${cat._id}`} key={ci}>
                  <div style={{ display: "flex" }}>
                    {/* onClick={() => setFoldState(cat._id)} */}
                    <CategoryTitle title="Click to fold">{category}</CategoryTitle>

                    {cat._id !== "no_category" ? (
                      <div>
                        <DeleteCategory onClick={handleDelete(cat._id)}>
                          <SrOnly>Delete</SrOnly>
                          <DeleteIcon></DeleteIcon>
                        </DeleteCategory>
                      </div>
                    ) : null}
                  </div>
                  <div className="items">
                    {categoryNotes?.map((note) => {
                      if (note.category_id === cat._id) {
                        const isActiveNote = isActive(activeNote ? activeNote : notes?.[0], note);

                        return (
                          <SidebarNote
                            onClick={() => {
                              if (isActiveNote) return;
                              setActiveNote(note._id);
                              closeSidebar("sidebar");
                            }}
                            key={note._id}
                            title={note.title}
                            className={isActiveNote ? "active" : ""}
                          >
                            {note.title}
                          </SidebarNote>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </CategoryDiv>
              );
            })}

            {/* don't show divider when no notes are found */}
            {notes && !notes[0] ? null : <Divider id="divider" />}

            <SidebarNote onClick={() => openModal("createNoteModal")}>Create new Note</SidebarNote>
            <SidebarNote onClick={() => openModal("createCategoryModal")}>
              Create new Category
            </SidebarNote>
            <SidebarNote onClick={() => openModal("optionsModal")}>Options</SidebarNote>
          </>
        </SidebarBody>
      </SidebarStyle>

      <SidebarActive onClick={() => closeSidebar("sidebar")} id="sidebarActive"></SidebarActive>

      <AlertModal
        width="600px"
        id="unsavedChanges"
        title="Unsaved changes"
        description="You have unsaved changes, please save them before continuing!"
        actions={[
          {
            onClick: () => {
              setTempId(null);
              closeModal(ModalIds.AlertUnsavedChanges);
            },
            name: "Go back",
          },
          {
            danger: true,
            onClick: () => setActiveNote(tempId!, false),
            name: "Continue without saving",
          },
        ]}
      />
    </>
  );
};

function isActive(activeNote: Note | undefined, note: Note) {
  return activeNote?._id === note?._id;
}

const mapToProps = (state: State) => ({
  notes: state.notes.notes,
  categories: state.categories.categories,
  activeNote: state.notes.note,
  editing: state.notes.editing,
});

export default connect(mapToProps, { deleteCategory })(Sidebar);
