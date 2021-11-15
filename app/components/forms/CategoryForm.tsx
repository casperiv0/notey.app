import * as React from "react";
import { Category } from ".prisma/client";
import { Form, useTransition } from "remix";
import { useModal } from "~/lib/useModal";
import { Button } from "../Button";
import { FormField } from "../form/FormField";
import { Input } from "../form/Input";
import { Modals } from "~/lib/constants";

export const CategoryForm = () => {
  const { closeModal, getPayload } = useModal();
  const data = useTransition();
  const category = getPayload<Category>(Modals.ManageCategory);

  React.useEffect(() => {
    if (data.state === "loading") {
      closeModal(Modals.ManageCategory);
    }
  }, [closeModal, data.state]);

  return (
    <Form action="/api/category" method={category ? "put" : "post"} className="mt-2">
      {category ? <Input className="hidden" defaultValue={category.id} id="id" name="id" /> : null}

      <FormField label="Name">
        <Input defaultValue={category?.name} id="name" name="name" />
      </FormField>

      <div className="flex justify-end">
        <Button type="button" onClick={() => closeModal(Modals.ManageCategory)} variant="cancel">
          Cancel
        </Button>
        <Button type="submit">{category ? "Save Changes" : "Create"}</Button>
      </div>
    </Form>
  );
};
