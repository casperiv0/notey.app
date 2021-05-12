import * as React from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Modal from "@components/modal/Modal";
import State from "types/State";
import { FormGroup, FormLabel, FormSmall } from "@styles/Auth";
import { Select, Button } from "@styles/Global";
import Note from "types/Note";
import { updateNoteById } from "@actions/note";
import { RequestData } from "@lib/fetch";
import { isTrue } from "@lib/utils";
import useModalEvent from "@hooks/useModalEvent";
import { ModalIds } from "@lib/constants";
import SelectCategory from "@components/SelectCategory";
import Category from "types/Category";

interface Props {
  note: Note | null;
  categories: Category[];
  updateNoteById: (id: string, data: RequestData) => void;
}

const ManageNoteModal: React.FC<Props> = ({ note, categories, updateNoteById }) => {
  const [categoryId, setCategoryId] = React.useState(`${note?.category_id}`);
  const [shareable, setShareable] = React.useState(`${note?.shared}`);
  const [locked, setLocked] = React.useState(`${note?.locked}`);
  const inputRef = useModalEvent<HTMLSelectElement>(ModalIds.ManageNoteModal);
  const router = useRouter();

  React.useEffect(() => {
    setShareable(`${note?.shared}`);
    setLocked(`${note?.locked}`);
    setCategoryId(`${note?.category_id}`);
  }, [note]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!note?._id) return;

    updateNoteById(note?._id, {
      ...note,
      category_id: categoryId,
      shared: isTrue(shareable),
      locked: isTrue(locked),
    });
  }

  function openShare() {
    note?.shared && router.push(`/share/${note?._id}`);
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
            categories={categories}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="shareable">Shareable</FormLabel>
          <Select
            name="Shareable"
            id="shareable"
            value={`${shareable}`}
            onChange={(e) => setShareable(e.target.value)}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
          <FormSmall style={{ marginTop: "0.5rem" }}>
            {note?.shared ? (
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
            onChange={(e) => setLocked(e.target.value)}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
          <FormSmall style={{ marginTop: "0.5rem" }}>
            {note?.locked ? (
              <h3>This note is locked</h3>
            ) : (
              <h3>
                This note is <strong>not</strong> locked
              </h3>
            )}
          </FormSmall>
        </FormGroup>
        <FormGroup>
          {note?.shared ? (
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

const mapToProps = (state: State) => ({
  note: state.notes.note,
  categories: state.categories.categories,
});

export default connect(mapToProps, { updateNoteById })(ManageNoteModal);
