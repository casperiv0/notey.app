import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import Modal from "../modal/Modal";
import ErrorMessage from "../ErrorMessage";
import { FormGroup, FormLabel, FormInput, SubmitBtn } from "../../styles/Auth";
import { connect } from "react-redux";
import { getActiveNote } from "../../actions/notes";
import { closeModal } from "../../utils/functions";

const EnterPinModal = ({
  getActiveNote,
  error,
  loading,
  tempId,
  closeAble,
}) => {
  const [pin, setPin] = useState("");
  const [canClose, setCanClose] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    getActiveNote(tempId, pin);
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted && pin !== "" && closeAble) {
      setCanClose(true);
      closeModal("enterPinModal");
    }

    if (canClose) {
      closeModal("enterPinModal");
      setTimeout(() => {
        setPin("");
        setSubmitted(true);
        setCanClose(false);
      }, 200);
    }
  }, [canClose, error, pin, submitted, closeAble]);

  return (
    <Modal title="Enter your pin code" id="enterPinModal">
      <form onSubmit={onSubmit}>
        <FormGroup>
          {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="pin">Pin Code</FormLabel>
          <FormInput
            autoFocus
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            id="pin"
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
  error: state.note.error,
  tempId: state.note.tempNoteId,
  closeAble: state.note.closeAble,
});

export default connect(mapStateToProps, { getActiveNote })(EnterPinModal);
