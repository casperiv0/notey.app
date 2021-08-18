import * as React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import Modal from "@components/modal/Modal";
import { FormGroup, FormLabel, FormSmall } from "@styles/Auth";
import { Select, Button } from "@styles/Global";
import { updateNoteById } from "@actions/note";
import { isTrue } from "@lib/utils";
import useModalEvent from "@hooks/useModalEvent";
import { ModalIds } from "@lib/constants";
import SelectCategory from "@components/SelectCategory";
import { useStore } from "store/StoreProvider";
import { toast } from "react-toastify";

const ManageNoteModal = () => {
  const [categoryId, setCategoryId] = React.useState<string>("");
  const [shareable, setShareable] = React.useState<boolean>(false);
  const [locked, setLocked] = React.useState<boolean>(false);
  const inputRef = useModalEvent<HTMLSelectElement>(ModalIds.ManageNoteModal);

  const store = useStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!store.note) return;

    setShareable(store.note.shared);
    setLocked(store.note.locked);
    setCategoryId(store.note.category_id);
  }, [store.note]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!store.note?._id) return;

    const data = await updateNoteById(store.note._id, {
      ...store.note,
      category_id: categoryId,
      shared: shareable,
      locked,
    });

    if (data) {
      store.hydrate(data);
      toast.success("Successfully updated note.");
    }
  }

  function openShare() {
    if (store.note?.shared) {
      router.push(`/share/${store.note._id}`);
    }
  }

  return (
    <Modal id={ModalIds.ManageNoteModal} title="Manage Note">
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel htmlFor="edit_category">Category</FormLabel>
          <SelectCategory
            ref={inputRef}
            id="edit_category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            categories={store.categories}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="shareable">Shareable</FormLabel>
          <Select
            name="Shareable"
            id="shareable"
            value={`${shareable}`}
            onChange={(e) => setShareable(isTrue(e.target.value))}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
          <FormSmall style={{ marginTop: "0.5rem" }}>
            {store.note?.shared ? (
              <h3>This note is able to be seen by others</h3>
            ) : (
              <h3>
                This note is <strong>not</strong> able to be seen by others
              </h3>
            )}
          </FormSmall>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="locked">Locked</FormLabel>
          <Select
            name="Locked"
            id="locked"
            value={`${locked}`}
            onChange={(e) => setLocked(isTrue(e.target.value))}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
          <FormSmall style={{ marginTop: "0.5rem" }}>
            {store.note?.locked ? (
              <h3>This note is locked</h3>
            ) : (
              <h3>
                This note is <strong>not</strong> locked
              </h3>
            )}
          </FormSmall>
        </FormGroup>
        <FormGroup>
          {store.note?.shared ? (
            <Button onClick={openShare} style={{ marginBottom: "10px" }} type="button">
              Open Share
            </Button>
          ) : null}
          <Button type="submit">Update note</Button>
        </FormGroup>
      </form>
    </Modal>
  );
};

export default observer(ManageNoteModal);
