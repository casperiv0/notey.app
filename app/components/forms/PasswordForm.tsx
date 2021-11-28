import * as React from "react";
import { Form, useTransition } from "remix";
import { useLocation } from "react-router";
import { useUser } from "~/lib/auth/auth";
import { Modals } from "~/lib/constants";
import { useModal } from "~/lib/useModal";
import { Button } from "../Button";
import { FormField } from "../form/FormField";
import { Input } from "../form/Input";
import { AlertModal } from "../modal/AlertModal";
import { Modal } from "../modal/Modal";

export const PasswordForm = () => {
  const { user } = useUser();
  const { closeModal } = useModal();
  const { pathname } = useLocation();
  const { state } = useTransition();

  const apiUrl = `/api/user/password?next=${pathname}`;

  React.useEffect(() => {
    if (state === "loading") {
      closeModal(Modals.ManagePassword);
    }
  }, [closeModal, state]);

  return (
    <Form action={apiUrl} method="patch" className="mt-2">
      <FormField label="Previous Password">
        <Input type="password" required id="prev_password" name="prev_password" />
      </FormField>

      <FormField label="New Password">
        <Input type="password" required id="new_password" name="new_password" />
      </FormField>

      <FormField label="Confirm Password">
        <Input type="password" required id="confirm_password" name="confirm_password" />
      </FormField>

      <div className="flex justify-end mt-8">
        <Modal.Close type="button" variant="cancel">
          Cancel
        </Modal.Close>
        <Button loading={state !== "idle"} type="submit">
          Save Changes
        </Button>
      </div>

      <AlertModal
        id={Modals.AlertDeleteAccount}
        action="delete-/api/user"
        dataId={user.id}
        title="Delete Account"
        description={
          <>
            Are you sure you want to delete your account? All data connected to this account will be
            deleted. This action cannot be undone.
          </>
        }
      />
    </Form>
  );
};
