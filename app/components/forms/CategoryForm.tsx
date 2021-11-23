import * as React from "react";
import { Category } from ".prisma/client";
import { Form, useTransition } from "remix";
import { useModal } from "~/lib/useModal";
import { Button } from "../Button";
import { FormField } from "../form/FormField";
import { Input } from "../form/Input";
import { Modals } from "~/lib/constants";
import { useLocation } from "react-router";
import classNames from "classnames";
import { AlertModal } from "../modal/AlertModal";

export const CategoryForm = () => {
  const { closeModal, openModal, getPayload } = useModal();
  const data = useTransition();
  const category = getPayload<Category>(Modals.ManageCategory);
  const location = useLocation();

  const apiUrl = `/api/category?next=${location.pathname}`;

  React.useEffect(() => {
    if (data.state === "loading") {
      closeModal(Modals.ManageCategory);
    }
  }, [closeModal, data.state]);

  return (
    <Form action={apiUrl} method={category ? "put" : "post"} className="mt-2">
      {category ? <Input className="hidden" defaultValue={category.id} id="id" name="id" /> : null}

      <FormField label="Name">
        <Input required defaultValue={category?.name} id="name" name="name" />
      </FormField>

      <div className={classNames("flex", category ? "justify-between" : "justify-end")}>
        {category ? (
          <Button
            onClick={() => openModal(Modals.AlertDeleteCategory)}
            type="button"
            variant="danger"
          >
            Delete Category
          </Button>
        ) : null}

        <div className="flex">
          <Button type="button" onClick={() => closeModal(Modals.ManageCategory)} variant="cancel">
            Cancel
          </Button>
          <Button type="submit">{category ? "Save Changes" : "Create"}</Button>
        </div>
      </div>

      {category ? (
        <AlertModal
          dataId={category.id}
          title={"Delete Category"}
          id={Modals.AlertDeleteCategory}
          action="delete-/api/category"
          description={
            <>Are you sure you want to delete <span className="font-bold">{category.name}</span>? This action cannot be undone.</>
          }
        />
      ) : null}
    </Form>
  );
};
