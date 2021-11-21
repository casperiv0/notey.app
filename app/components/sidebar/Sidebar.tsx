import type { Category, Note } from ".prisma/client";
import { useId } from "react-aria";
import { ThreeDots } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { useLoaderData } from "remix";
import { Button } from "~/components/Button";
import { CategoryForm } from "../forms/CategoryForm";
import { Modal } from "../modal/Modal";
import { CategoryItem } from "./Category";
import { Dropdown } from "~/components/dropdown/Dropdown";
import { useModal } from "~/lib/useModal";
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
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/auth/logout");
  }

  return (
    <aside className="w-[300px] p-5 bg-dark-1 min-h-screen shadow-sm">
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
            <Dropdown.Item disabled onClick={() => openModal(Modals.Credits)}>
              Credits
            </Dropdown.Item>

            <Dropdown.Separator />

            <Dropdown.Label>Account</Dropdown.Label>
            <Dropdown.Item onClick={() => openModal(Modals.ManageAccount)}>
              Manage Account
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout} variant="danger">
              Logout
            </Dropdown.Item>
          </Dropdown>
        </section>

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

      <ManageCategoryModal />
      <ManageNoteModal />
    </aside>
  );
};

const ManageNoteModal = () => {
  const { getPayload } = useModal();

  const payload = getPayload(Modals.CreateNote);
  const title = payload ? `Manage ${payload.title}` : "Create new Note";

  return (
    <Modal title={title} id={Modals.CreateNote}>
      <NoteForm />
    </Modal>
  );
};

const ManageCategoryModal = () => {
  const { getPayload } = useModal();

  const payload = getPayload<Category>(Modals.ManageCategory);
  const title = payload ? `Manage ${payload.name}` : "Create new category";

  return (
    <Modal title={title} id={Modals.ManageCategory}>
      <CategoryForm />
    </Modal>
  );
};
