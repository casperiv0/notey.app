import { Form } from "remix";
import { useUser } from "~/lib/auth/auth";
import { Modals } from "~/lib/constants";
import { useModal } from "~/lib/useModal";
import { Button } from "../Button";
import { FormField } from "../form/FormField";
import { Input } from "../form/Input";
import { Switch } from "../form/Switch";

export const AccountForm = () => {
  const { user } = useUser();
  const { closeModal } = useModal();

  return (
    <Form method="patch" className="mt-2">
      <FormField label="Username">
        <Input defaultValue={user.username} id="name" name="name" />
      </FormField>

      <FormField checkbox label="Show cursor pointers">
        {/* <Input
          type="checkbox"
          defaultValue={user.username}
          id="show_cursor_pointers"
          name="show_cursor_pointers"
        /> */}
        <Switch id="show_cursor_pointers" name="show_cursor_pointers" />
      </FormField>

      <FormField checkbox label="Dark theme">
        <Input type="checkbox" defaultValue={user.username} id="dark_theme" name="dark_theme" />
      </FormField>

      <div className="flex justify-end">
        <Button type="button" onClick={() => closeModal(Modals.ManageAccount)} variant="cancel">
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </Form>
  );
};
