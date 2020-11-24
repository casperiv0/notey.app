import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import Modal from "../modal/Modal";
import ErrorMessage from "../ErrorMessage";
import {
  FormGroup,
  FormLabel,
  FormInput,
  SubmitBtn,
  FormSmall,
} from "../../styles/Auth";
import { connect } from "react-redux";
import { setPinCode } from "../../actions/auth";
import { closeModal } from "../../utils/functions";

const SetPinModal = ({ setPinCode, error, loading, closeAble }) => {
  const [pin, setPin] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    setPinCode(pin);
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted && pin !== "" && closeAble) {
      closeModal("setPinModal");
      setPin("");
      setSubmitted(true);
    }
  }, [pin, submitted, closeAble]);

  return (
    <Modal title="Enter a PIN code" id="setPinModal">
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
            id="new_pin"
            maxLength="8"
            max="8"
            required
          />
          <FormSmall>
            This code is max 8 characters long and
            <strong>&nbsp;will&nbsp;</strong> be encrypted
          </FormSmall>
        </FormGroup>
        <FormGroup>
          <SubmitBtn type="submit" disabled={loading}>
            {loading ? <Loader /> : "Set PIN Code"}
          </SubmitBtn>
        </FormGroup>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  closeAble: state.auth.closeAble,
});

export default connect(mapStateToProps, { setPinCode })(SetPinModal);
