import * as React from "react";
import { useRouter } from "next/router";
import Modal from "@components/modal/Modal";
import { FormGroup, FormLabel, FormInput, SubmitBtn, FormSmall } from "@styles/Auth";
import { TextArea, Select } from "@styles/Global";
import { connect } from "react-redux";
import State from "types/State";
import Category from "types/Category";
import { closeModal, closeSidebar, isTrue } from "@lib/utils";
import { RequestData } from "@lib/fetch";
import { createNote } from "@actions/note";
import Loader from "@components/loader/Loader";
import SelectCategory from "@components/SelectCategory";
import useModalEvent from "@hooks/useModalEvent";
import { ModalIds } from "@lib/constants";

interface Props {
  loading: boolean;
  categories: Category[];
  createNote: (data: RequestData) => Promise<boolean | string>;
}

const CreateNoteModal: React.FC<Props> = ({ categories, loading, createNote }) => {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("no_category");
  const [canClose, setCanClose] = React.useState(false);
  const [shareable, setShareable] = React.useState("false");
  const [locked, setLocked] = React.useState("false");
  const inputRef = useModalEvent<HTMLInputElement>(ModalIds.CreateNoteModal);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      title,
      body,
      category_id: categoryId,
      shareable: isTrue(shareable),
      locked: isTrue(locked),
    };
    const created = await createNote(data);

    if (created === false) {
      setCanClose(false);
    } else {
      setCanClose(true);
      router.push({
        href: "/app",
        query: {
          noteId: created,
        },
      });
    }
  }

  React.useEffect(() => {
    if (canClose) {
      closeSidebar("sidebar");
      setTitle("");
      setBody("");
      setCategoryId("no_category");
      setShareable("false");
      setLocked("false");
      closeModal(ModalIds.CreateNoteModal);
      setCanClose(false);
    }
  }, [canClose]);

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
          ></TextArea>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="category">Category</FormLabel>
          <SelectCategory
            id="category"
            onChange={(e) => setCategoryId(e.target.value)}
            value={categoryId}
            categories={categories}
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
            onChange={(e) => setShareable(e.target.value)}
          >
            <option value={"true"}>Yes</option>
            <option value={"false"}>No</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="create_locked">Locked</FormLabel>
          <Select
            disabled
            name="Locked"
            id="create_locked"
            value={`${locked}`}
            onChange={(e) => setLocked(e.target.value)}
            style={{ cursor: "not-allowed" }}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
          <FormSmall>
            {/* You can set a PIN code by clicking &quot;options&quot; in the sidebar then pressing
            &quot;change/set PIN Code&quot; */}
            Coming soon!
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

const mapToProps = (state: State) => ({
  categories: state.categories.categories,
  loading: state.notes.loading,
});

export default connect(mapToProps, { createNote })(CreateNoteModal);
