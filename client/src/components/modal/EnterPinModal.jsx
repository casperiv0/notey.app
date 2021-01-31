import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import Modal from "../modal/Modal";
import { FormGroup, FormLabel, FormInput, SubmitBtn } from "../../styles/Auth";
import { connect } from "react-redux";
import { getActiveNote } from "../../actions/notes";
import { closeModal } from "../../utils/functions";

const EnterPinModal = ({ getActiveNote, loading, tempId }) => {
  const [pin, setPin] = useState("");
  const [canClose, setCanClose] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    const created = await getActiveNote(tempId, pin);

    setCanClose(created);
  }

  useEffect(() => {
    if (canClose) {
      closeModal("enterPinModal");
      setPin("");
      setCanClose(false);
    }
  }, [canClose]);

  return (
    <Modal title="Enter your pin code" id="enterPinModal">
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel htmlFor="pin">Pin Code</FormLabel>
          <FormInput
            autoFocus
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            id="enter_pin"
            maxLength="8"
            max="8"
            required
          />
        </FormGroup>
        <FormGroup>
          <SubmitBtn type="submit" disabled={loading}>
            {loading ? <Loader /> : "View note"}
          </SubmitBtn>
        </FormGroup>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  tempId: state.note.tempNoteId,
});

export default connect(mapStateToProps, { getActiveNote })(EnterPinModal);
