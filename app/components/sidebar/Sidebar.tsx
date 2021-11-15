import { Category, Note } from ".prisma/client";
import { useId } from "react-aria";
import { ThreeDots } from "react-bootstrap-icons";
import { Button } from "~/components/Button";
import { CategoryForm } from "../forms/CategoryForm";
import { Modal } from "../modal/Modal";
import { CategoryItem } from "./Category";
import { Dropdown } from "~/components/dropdown/Dropdown";
import { useModal } from "~/lib/useModal";
import { Form, useLoaderData } from "remix";
import { Modals } from "~/lib/constants";
import { NoteForm } from "../forms/NoteForm";
import { useUser } from "~/lib/auth/auth";
import { FormField } from "../form/FormField";
import { Input } from "../form/Input";
import { AccountForm } from "../forms/AccountForm";

export const Sidebar = () => {
  const { user } = useUser();
  const { openModal } = useModal();
  const dotsId = useId();
  const data =
    useLoaderData<{ noCategoryNotes: Note[]; categories: (Category & { notes: Note[] })[] }>();
  const categories = data?.categories ?? [];
  const noCategoryNotes = data?.noCategoryNotes ?? [];

  return (
    <aside className="w-[300px] p-5 bg-gray-100 min-h-screen shadow-sm">
      <header>
        <section className="flex items-center justify-between">
          <h1
            title={`Welcome back, ${user.username}`}
            className="text-base font-medium max-w-[250px]"
          >
            Welcome back, {user.username}!
          </h1>

          <Dropdown
            extra={{ maxWidth: 200 }}
            trigger={
              <Button className="px-1" variant="icon" id={dotsId} aria-label="More Settings">
                <ThreeDots aria-labelledby={dotsId} />
              </Button>
            }
          >
            <Dropdown.Label>App</Dropdown.Label>
            <Dropdown.Item onClick={() => openModal(Modals.CreateNote)}>
              Create new note
            </Dropdown.Item>
            <Dropdown.Item onClick={() => openModal(Modals.ManageCategory)}>
              Create new category
            </Dropdown.Item>

            <Dropdown.Separator />

            <Dropdown.Label>Account</Dropdown.Label>
            <Dropdown.Item onClick={() => openModal(Modals.ManageAccount)}>
              Manage Account
            </Dropdown.Item>
            <Dropdown.Item type="submit" variant="danger">
              Logout
            </Dropdown.Item>
          </Dropdown>
        </section>

        <Modal title={"Create new category"} id={Modals.ManageCategory}>
          <CategoryForm />
        </Modal>

        <Modal title={"Create new note"} id={Modals.CreateNote}>
          <NoteForm />
        </Modal>

        <Modal title={"User Settings"} id={Modals.ManageAccount}>
          <AccountForm />
        </Modal>
      </header>

      <section className="mt-5">
        <FormField label="Search">
          <Input placeholder="Search notes.." type="search" />
        </FormField>

        <ul role="list">
          {categories.map((category) => {
            return <CategoryItem key={category.id} category={category} />;
          })}

          <CategoryItem
            category={{
              userId: "null",
              id: "no_category",
              name: "No category",
              notes: noCategoryNotes,
              createdAt: new Date(""),
              folded: false,
            }}
          />
        </ul>
      </section>
    </aside>
  );
};
