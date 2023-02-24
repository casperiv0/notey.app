import * as React from "react";
import { Category, Note } from ".prisma/client";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { useModal } from "~/lib/useModal";
import { Button } from "../Button";
import { FormField } from "../form/form-field";
import { Input } from "../form/input";
import { Modals } from "~/lib/constants";
import { Select } from "../form/select";
import { useLocation } from "react-router";
import { Switch } from "../form/switch";
import { Tooltip } from "../Tooltip";

export const NoteForm = () => {
  const { closeModal, getPayload } = useModal();
  const note = getPayload<Note | null>(Modals.CreateNote);
  const location = useLocation();

  const { categories } = useLoaderData<{ categories: Category[] }>();
  const data = useTransition();

  const apiUrl = `/actions/note?next=${location.pathname}`;

  React.useEffect(() => {
    if (data.state === "loading") {
      closeModal(Modals.CreateNote);
    }
  }, [closeModal, data.state]);

  return (
    <Form action={note ? apiUrl : "/actions/note"} method={note ? "put" : "post"} className="mt-2">
      {note ? <Input className="hidden" defaultValue={note.id} id="id" name="id" /> : null}

      <FormField label="Name">
        <Input required defaultValue={note?.title} id="title" name="title" />
      </FormField>

      <FormField label="Category">
        <Select
          required
          defaultValue={note?.categoryId ?? "null"}
          id="categoryId"
          name="categoryId"
        >
          {categories.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
          <option value="null">No Category</option>
        </Select>
      </FormField>

      <FormField className="mt-5" checkbox label="PIN Code Locked">
        <Tooltip
          trigger={
            <Switch
              defaultChecked={note?.pinCodeLocked ?? false}
              id="pinCodeLocked"
              name="pinCodeLocked"
              disabled
            />
          }
        >
          Coming soon!
        </Tooltip>
      </FormField>

      <FormField className="mt-5" checkbox label="Public">
        <Tooltip
          trigger={<Switch defaultChecked={note?.public ?? false} id="isPublic" name="isPublic" />}
        >
          When this note is set to public, it can be viewed by anyone with a link.
        </Tooltip>
      </FormField>

      {note?.public ? (
        <small className="text-base">
          <a
            rel="noreferrer noopener"
            target="_blank"
            className="underline"
            href={`https://notey.caspertheghost.me/share/${note.id}`}
          >
            Note is publicly available here
          </a>
        </small>
      ) : null}

      <div className="flex justify-end">
        <Button type="button" onClick={() => closeModal(Modals.CreateNote)} variant="cancel">
          Cancel
        </Button>
        <Button loading={data.state !== "idle"} type="submit">
          {note ? "Save Changes" : "Create"}
        </Button>
      </div>
    </Form>
  );
};
