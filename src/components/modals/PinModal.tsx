import * as React from "react";
import { connect } from "react-redux";
import Modal from "@components/modal/Modal";
import useModalEvent from "@hooks/useModalEvent";
import { closeModal } from "@lib/utils";
import { ModalIds } from "@lib/constants";
import { FormGroup, FormInput, FormLabel, SubmitBtn } from "@styles/Auth";
import { getNoteById } from "@actions/note";
import State from "types/State";
import Loader from "@components/loader/Loader";

interface Props {
  tempId: string | null;
  getNoteById: (
    noteId: string,
    share: boolean,
    cookie?: string,
    pin?: string,
  ) => Promise<boolean | undefined>;
}

const EnterPinModal: React.FC<Props> = ({ tempId, getNoteById }) => {
  const [pin, setPin] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const inputRef = useModalEvent<HTMLInputElement>(ModalIds.PinRequired);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tempId) return;
    setLoading(true);

    const success = await getNoteById(tempId, false, undefined, pin);

    if (success) {
      closeModal(ModalIds.PinRequired);
    }

    setLoading(false);
  }

  return (
    <Modal style={{ zIndex: "50" }} title="Options" id={ModalIds.PinRequired}>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel htmlFor="pin">Pin Code</FormLabel>
          <FormInput
            ref={inputRef}
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            id="enter_pin"
            maxLength={8}
            required
          />
        </FormGroup>
        <FormGroup>
          <SubmitBtn disabled={!pin || loading} type="submit">
            {loading ? <Loader /> : "Submit"}
          </SubmitBtn>
        </FormGroup>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state: State) => ({
  tempId: state.notes.tempNoteId,
});

export default connect(mapStateToProps, { getNoteById })(EnterPinModal);
