import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { FormGroup, FormLabel, FormSmall } from "../../styles/Auth";
import { Select, Button } from "../../styles/Global";
import { updateNoteOptions } from "../../actions/notes";
import { useHistory } from "react-router-dom";

const ManageNoteModal = ({ note, updateNoteOptions }) => {
  const [shareable, setShareable] = useState(note?.shared);
  const [locked, setLocked] = useState(note?.locked);
  const history = useHistory();

  useEffect(() => {
    if (note?._id) {
      setShareable(note?.shared);
      setLocked(note?.locked);
    }
  }, [note]);

  if (note === null) {
    return <p>Loading</p>;
  }

  function onSubmit(e) {
    e.preventDefault();

    updateNoteOptions(note._id, {
      shareable: String(shareable),
      locked: String(locked),
    });
  }

  function openShare() {
    history.push(`share/${note._id}`);
  }

  return (
    <Modal id="manageNoteModal" title="Manage Note">
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel>Shareable</FormLabel>
          <Select value={shareable} onChange={(e) => setShareable(e.target.value)}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
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
          <Select value={locked} onChange={(e) => setLocked(e.target.value)}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
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
          {note.shared ? (
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

const mapToProps = (state) => ({
  note: state.note.note,
});

export default connect(mapToProps, { updateNoteOptions })(ManageNoteModal);
