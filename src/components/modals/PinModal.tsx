import * as React from "react";
import { observer } from "mobx-react-lite";
import Modal from "@components/modal/Modal";
import useModalEvent from "@hooks/useModalEvent";
import { closeModal } from "lib/utils";
import { ModalIds } from "lib/constants";
import { FormGroup, FormInput, FormLabel, SubmitBtn } from "@styles/Auth";
import { getNoteById } from "actions/note";
import Loader from "@components/loader/Loader";
import { useStore } from "store/StoreProvider";

const EnterPinModal = () => {
  const store = useStore();

  const [pin, setPin] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const inputRef = useModalEvent<HTMLInputElement>(ModalIds.PinRequired);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!store.note?._id) return;
    setLoading(true);

    const data = await getNoteById(store.note._id, undefined, pin);

    if (data) {
      store.hydrate(data);
      closeModal(ModalIds.PinRequired);
    }

    setLoading(false);
  }

  return (
    <Modal style={{ zIndex: "50" }} title="Enter PIN to continue" id={ModalIds.PinRequired}>
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
            autoComplete="pin-code"
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

export default observer(EnterPinModal);
