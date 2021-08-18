import * as React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import Modal from "@components/modal/Modal";
import { FormGroup, FormLabel, FormInput, SubmitBtn, FormSmall } from "@styles/Auth";
import { TextArea, Select } from "@styles/Global";
import { closeModal, closeSidebar, isTrue } from "@lib/utils";
import { createNote } from "@actions/note";
import Loader from "@components/loader/Loader";
import SelectCategory from "@components/SelectCategory";
import useModalEvent from "@hooks/useModalEvent";
import { ModalIds } from "@lib/constants";
import { useStore } from "store/StoreProvider";

const CreateNoteModal = () => {
  const router = useRouter();
  const store = useStore();
  const inputRef = useModalEvent<HTMLInputElement>(ModalIds.CreateNoteModal);

  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("no_category");
  const [shareable, setShareable] = React.useState(false);
  const [locked, setLocked] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const data = {
      title,
      body,
      category_id: categoryId,
      shareable,
      locked,
    };
    const createdData = await createNote(data);

    if (createdData) {
      store.hydrate(createdData);
      store.setEditingNote(createdData.note);

      closeSidebar("sidebar");
      setTitle("");
      setBody("");
      setCategoryId("no_category");
      setShareable(false);
      setLocked(false);
      closeModal(ModalIds.CreateNoteModal);

      router.push({
        href: "/app",
        query: {
          noteId: createdData.noteId,
        },
      });
    }

    setLoading(false);
  }

  return (
    <Modal style={{ zIndex: 29 }} title="Create new title" id={ModalIds.CreateNoteModal}>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel htmlFor="title">Title</FormLabel>
          <FormInput
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            maxLength={40}
            max="40"
            autoCorrect="false"
            autoComplete="false"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="body">Body</FormLabel>
          <TextArea
            maxHeight="70vh"
            minHeight="45px"
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            autoCorrect="false"
            autoComplete="false"
            id="body"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="category">Category</FormLabel>
          <SelectCategory
            id="category"
            onChange={(e) => setCategoryId(e.target.value)}
            value={categoryId}
            categories={store.categories}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="create_shareable">
            Shareable (People are able to view this with a link)
          </FormLabel>
          <Select
            name="Shareable"
            id="create_shareable"
            value={`${shareable}`}
            onChange={(e) => setShareable(isTrue(e.target.value))}
          >
            <option value={"true"}>Yes</option>
            <option value={"false"}>No</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="create_locked">Locked</FormLabel>
          <Select
            name="Locked"
            id="create_locked"
            value={`${locked}`}
            onChange={(e) => setLocked(isTrue(e.target.value))}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
          <FormSmall>
            You can set a PIN code by clicking &quot;options&quot; in the sidebar then pressing
            &quot;change/set PIN Code&quot;
          </FormSmall>
        </FormGroup>
        <FormGroup>
          <SubmitBtn type="submit" disabled={loading}>
            {loading ? <Loader /> : "Create"}
          </SubmitBtn>
        </FormGroup>
      </form>
    </Modal>
  );
};

export default observer(CreateNoteModal);
