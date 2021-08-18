import * as React from "react";
import { observer } from "mobx-react-lite";
import { Button, Row, SrOnly } from "@styles/Global";
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
import { closeModal, openModal, openSidebar } from "lib/utils";
import SelectCategory from "@components/SelectCategory";
import RightSidebar from "./RightSidebar";
import { deleteNoteById, updateNoteById } from "actions/note";
import { AlertModal } from "@components/modals/AlertModal";
import { ModalIds } from "lib/constants";
import { useStore } from "store/StoreProvider";

const Navbar = () => {
  const store = useStore();

  async function handleEdit() {
    if (!store.note || !store.editingNote) return;

    const newEditing = !store.editing;
    store.setEditing(!store.editing);

    if (newEditing === false) {
      const data = await updateNoteById(store.note._id, { ...store.editingNote });
      store.hydrate(data);
    }
  }

  async function handleDelete() {
    if (!store.note) return;

    store.setEditing(false);
    const data = await deleteNoteById(store.note._id);
    store.hydrate(data);

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
              {store.note ? (
                store.editing ? (
                  <NavTitleInput
                    id="activeNoteTitle"
                    value={store.editingNote?.title}
                    onChange={(e) =>
                      store.setEditingNote({
                        ...store.editingNote,
                        title: e.target.value,
                      })
                    }
                  />
                ) : (
                  <h4>{store.editingNote?.title}</h4>
                )
              ) : (
                "No notes found"
              )}
            </>
          </NavTitle>
          <NavLinks>
            {store.note?._id ? (
              <Row>
                <OpenRightSidebar title="Open Options" onClick={() => openSidebar("right-sidebar")}>
                  <SrOnly>Options</SrOnly>
                  <OptionsIcon />
                </OpenRightSidebar>
                <Row>
                  {store.note.locked === true && store.pinRequired === true ? (
                    <Button navBtn onClick={() => openModal(ModalIds.PinRequired)}>
                      Unlock
                    </Button>
                  ) : (
                    <>
                      {store.editing ? (
                        <SelectCategory
                          className="is-in-nav"
                          id="activeNoteTitle"
                          value={store.editingNote?.category_id!}
                          categories={store.categories}
                          onChange={(e) =>
                            store.setEditingNote({
                              ...store.editingNote,
                              category_id: e.target.value,
                            })
                          }
                        />
                      ) : null}
                      <Button navBtn danger onClick={() => openModal(ModalIds.AlertDeleteNote)}>
                        Delete
                      </Button>
                      <Button navBtn className="ml" onClick={handleEdit}>
                        {store.editing ? "Save" : "Edit"}
                      </Button>
                      <Button
                        navBtn
                        className="ml"
                        onClick={() => openModal(ModalIds.ManageNoteModal)}
                      >
                        Manage
                      </Button>
                    </>
                  )}
                </Row>
              </Row>
            ) : null}
          </NavLinks>
        </NavbarStyle>

        <RightSidebar locked={store.note?.locked ?? false} pinRequired={store.pinRequired} />
      </NavbarContainer>

      <AlertModal
        id={ModalIds.AlertDeleteNote}
        title="Delete note"
        description={
          <>
            Are you sure you want to delete <strong>{store.note?.title ?? "this note"}</strong>?
            This cannot be undone!
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

export default observer(Navbar);
