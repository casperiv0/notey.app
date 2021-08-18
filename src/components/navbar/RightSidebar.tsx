import * as React from "react";
import { observer } from "mobx-react-lite";
import CloseIcon from "@components/icons/CloseIcon";
import SelectCategory from "@components/SelectCategory";
import { closeSidebar, openModal } from "lib/utils";
import { Button, Column, SrOnly } from "@styles/Global";
import {
  RightSidebarActive,
  RightSidebarStyle,
  RightSidebarContent,
  CloseRightSidebar,
} from "./styles";
import { ModalIds } from "lib/constants";
import { useStore } from "store/StoreProvider";

interface Props {
  locked: boolean;
  pinRequired: boolean;
}

const RightSidebar: React.FC<Props> = ({ locked, pinRequired }) => {
  const store = useStore();

  const handleEdit = () => {
    store.setEditing(!store.editing);
  };

  return (
    <>
      <RightSidebarActive onClick={() => closeSidebar("right-sidebar")} id="right-sidebarActive" />

      <RightSidebarStyle id="right-sidebar">
        <RightSidebarContent>
          <Column>
            <CloseRightSidebar onClick={() => closeSidebar("right-sidebar")} title="Close Options">
              <SrOnly>Close Options</SrOnly>
              <CloseIcon />
            </CloseRightSidebar>

            {locked === true && pinRequired === true ? (
              <Button onClick={() => openModal(ModalIds.PinRequired)}>Unlock</Button>
            ) : (
              <>
                <Button style={{ marginBottom: "10px" }} onClick={handleEdit}>
                  {store.editing ? "Save" : "Edit"}
                </Button>

                <Button
                  onClick={() => openModal(ModalIds.ManageNoteModal)}
                  style={{ marginBottom: "10px" }}
                >
                  Manage
                </Button>

                {store.editing ? (
                  <div style={{ marginBottom: "10px" }}>
                    <SelectCategory
                      categories={store.categories}
                      value={store.editingNote?.category_id!}
                      onChange={(e) =>
                        store.setEditingNote({
                          ...store.editingNote,
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
              </>
            )}
          </Column>
        </RightSidebarContent>
      </RightSidebarStyle>
    </>
  );
};

export default observer(RightSidebar);
