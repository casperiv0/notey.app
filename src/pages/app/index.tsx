import { verifyAuth } from "actions/auth";
import { GetServerSideProps } from "next";
import * as React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { observer } from "mobx-react-lite";
import { useMounted } from "@casper124578/useful/hooks/useMounted";
import { getNoteById, getNotes } from "actions/note";
import Sidebar from "@components/sidebar/Sidebar";
import { getCategories } from "actions/categories";
import { AppLayout } from "@styles/Global";
import Main from "@components/main/Main";
import { openModal } from "lib/utils";
import { ModalIds } from "lib/constants";
import Seo from "@components/Seo";
import PinModal from "@components/modals/PinModal";
import { useStore } from "store/StoreProvider";

const OptionsModal = dynamic(() => import("@components/modals/OptionsModal"), { ssr: false });
const ManageNoteModal = dynamic(() => import("@components/modals/ManageNote"), { ssr: false });
const ChangePinModal = dynamic(() => import("@components/modals/ChangePinModal"), { ssr: false });
const CreateNoteModal = dynamic(() => import("@components/modals/CreateNote"), { ssr: false });
const CreateCategoryModal = dynamic(() => import("@components/modals/CreateCategory"), {
  ssr: false,
});

const AppPage = () => {
  const router = useRouter();
  const isMounted = useMounted();
  const store = useStore();

  React.useEffect(() => {
    if (store.pinRequired && isMounted) {
      openModal(ModalIds.PinRequired);
    }
  }, [store.pinRequired, isMounted]);

  React.useEffect(() => {
    if (!store.isAuth) {
      router.push("/auth/login");
    }
  }, [store.isAuth, router]);

  return (
    <>
      {store.note ? (
        <Seo
          url={`https://notey.caspertheghost.me/app?noteId=${store.note._id}`}
          title={`${store.note.title} - notey.app`}
        />
      ) : (
        <Seo url="https://notey.caspertheghost.me/app" />
      )}

      <AppLayout>
        <Sidebar />

        <Main />
      </AppLayout>

      <OptionsModal />

      <CreateNoteModal />
      <CreateCategoryModal />
      <ChangePinModal />
      <PinModal />

      {/* don't render this modal when the user still needs to enter their PIN */}
      {!store.pinRequired ? (
        <>
          <ManageNoteModal />
        </>
      ) : null}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = ctx.req.headers.cookie;

  const notes = await getNotes(cookie);
  const categories = await getCategories(cookie);
  const note = await getNoteById(ctx.query.noteId?.toString()!, cookie);
  const auth = await verifyAuth(cookie);

  return { props: { initialState: { ...auth, ...note, ...notes, ...categories } } };
};

export default observer(AppPage);
