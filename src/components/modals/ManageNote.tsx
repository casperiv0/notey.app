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

interface Props {
  note: Note | null;
  updateNoteById: (id: string, data: RequestData) => void;
}

const ManageNoteModal: React.FC<Props> = ({ note, updateNoteById }) => {
  const [shareable, setShareable] = React.useState(`${note?.shared}`);
  const [locked, setLocked] = React.useState(`${note?.locked}`);
  const inputRef = useModalEvent<HTMLSelectElement>("manageNoteModal");
  const router = useRouter();

  React.useEffect(() => {
    setShareable(`${note?.shared}`);
    setLocked(`${note?.locked}`);
  }, [note]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!note?._id) return;

    updateNoteById(note?._id, {
      ...note,
      shared: isTrue(shareable),
    });
  }

  function openShare() {
    note?.shared && router.push(`/share/${note?._id}`);
  }

  return (
    <Modal id="manageNoteModal" title="Manage Note">
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel>Shareable</FormLabel>
          <Select
            ref={inputRef}
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
          <FormLabel>Locked</FormLabel>
          <Select
            style={{ cursor: "not-allowed" }}
            disabled
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
});

export default connect(mapToProps, { updateNoteById })(ManageNoteModal);
