import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import Modal from "../modal/Modal";
import { FormGroup, FormLabel, FormInput, SubmitBtn, FormSmall } from "../../styles/Auth";
import { connect } from "react-redux";
import { setPinCode } from "../../actions/auth";
import { closeModal } from "../../utils/functions";

const SetPinModal = ({ setPinCode, loading }) => {
  const [pin, setPin] = useState("");
  const [canClose, setCanClose] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    const created = await setPinCode(pin);
    setCanClose(created);
  }

  useEffect(() => {
    if (canClose) {
      closeModal("setPinModal");
      setPin("");
    }
  }, [canClose]);

  return (
    <Modal title="Enter a PIN code" id="setPinModal">
      <form onSubmit={onSubmit}>
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

export default connect(null, { setPinCode })(SetPinModal);
