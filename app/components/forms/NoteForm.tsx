import * as React from "react";
import { Category, Note } from ".prisma/client";
import { Form, useLoaderData, useTransition } from "remix";
import { useModal } from "~/lib/useModal";
import { Button } from "../Button";
import { FormField } from "../form/FormField";
import { Input } from "../form/Input";
import { Modals } from "~/lib/constants";
import { Select } from "../form/Select";
import { useLocation } from "react-router";

export const NoteForm = () => {
  const { closeModal, getPayload } = useModal();
  const note = getPayload<Note>(Modals.CreateNote);
  const location = useLocation();

  const { categories } = useLoaderData<{ categories: Category[] }>();
  const data = useTransition();

  const apiUrl = `/api/note?next=${location.pathname}`;

  React.useEffect(() => {
    if (data.state === "loading") {
      closeModal(Modals.CreateNote);
    }
  }, [closeModal, data.state]);

  return (
    <Form action={apiUrl} method={note ? "put" : "patch"} className="mt-2">
      {note ? <Input className="hidden" defaultValue={note.id} id="id" name="id" /> : null}

      <FormField label="Name">
        <Input defaultValue={note?.title} id="title" name="title" />
      </FormField>

      <FormField label="Category">
        <Select defaultValue={note?.categoryId ?? "null"} id="categoryId" name="categoryId">
          {categories.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
          <option value={"null"}>No Category</option>
        </Select>
      </FormField>

      <div className="flex justify-end">
        <Button type="button" onClick={() => closeModal(Modals.CreateNote)} variant="cancel">
          Cancel
        </Button>
        <Button type="submit">{note ? "Save Changes" : "Create"}</Button>
      </div>
    </Form>
  );
};
