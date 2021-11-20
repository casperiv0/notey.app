import { useToggleButton } from "@react-aria/button";
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
    <Form action="/api/user" method="patch" className="mt-2">
      <FormField label="Username">
        <Input defaultValue={user.username} id="username" name="username" />
      </FormField>

      <FormField checkbox label="Show cursor pointers">
        <Switch
          defaultChecked={user.preferences?.cursorPointers ?? false}
          name="show_cursor_pointers"
        />
      </FormField>

      <FormField checkbox label="Dark theme">
        <Switch disabled defaultChecked={user.preferences?.darkTheme ?? true} id="dark_theme" />
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