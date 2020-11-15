import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { FormGroup, FormLabel, FormSmall } from "../../styles/Auth";
import { Select, Button, ReportBtn } from "../../styles/Global";
import { shareNote } from "../../actions/notes";

const ManageNoteModal = ({ note, shareNote }) => {
  const [shareable, setShareable] = useState(note?.shared);

  useEffect(() => {
    if (note?._id) {
      setShareable(note?.shared);
    }
  }, [note]);

  if (note === null) {
    return <p>Loading</p>;
  }

  function onSubmit(e) {
    e.preventDefault();

    shareNote(note._id, { shareable: shareable });
  }

  return (
    <Modal id="manageNoteModal" title="Manage Note">
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel>Shareable</FormLabel>
          <Select
            value={shareable}
            onChange={(e) => setShareable(e.target.value)}
          >
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
          {note?.shared ? (
            <ReportBtn target="_blank" href={`/#/share/${note?._id}`}>
              Open Share
            </ReportBtn>
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

export default connect(mapToProps, { shareNote })(ManageNoteModal);
