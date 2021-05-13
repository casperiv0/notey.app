import { checkAuth } from "@actions/auth";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useMounted } from "@casper124578/useful/hooks/useMounted";
import { initializeStore } from "src/store/store";
import State from "types/State";
import { getNoteById, getNotes } from "@actions/note";
import Sidebar from "@components/sidebar/Sidebar";
import { getCategories } from "@actions/categories";
import { AppLayout } from "@styles/Global";
import Main from "@components/main/Main";
import Note from "types/Note";
import { openModal } from "@lib/utils";
import { ModalIds } from "@lib/constants";
import Seo from "@components/Seo";
import PinModal from "@components/modals/PinModal";

const OptionsModal = dynamic(() => import("@components/modals/OptionsModal"), { ssr: false });
const ManageNoteModal = dynamic(() => import("@components/modals/ManageNote"), { ssr: false });
const ChangePinModal = dynamic(() => import("@components/modals/ChangePinModal"), { ssr: false });
const CreateNoteModal = dynamic(() => import("@components/modals/CreateNote"), { ssr: false });
const CreateCategoryModal = dynamic(() => import("@components/modals/CreateCategory"), {
  ssr: false,
});

interface Props {
  isAuth: boolean;
  loading: boolean;
  note: Note | null;
  pinRequired: boolean;
}

const AppPage: NextPage<Props> = ({ loading, isAuth, note, pinRequired }) => {
  const router = useRouter();
  const isMounted = useMounted();

  React.useEffect(() => {
    if (pinRequired && isMounted) {
      openModal(ModalIds.PinRequired);
    }
  }, [pinRequired, isMounted]);

  React.useEffect(() => {
    if (!loading && !isAuth) {
      router.push("/auth/login");
    }
  }, [isAuth, loading, router]);

  React.useEffect(() => {
    const modal = router.query.modal as string | undefined;

    // wait for app to be mounted
    if (!isMounted) return;

    switch (modal) {
      case "note": {
        openModal(ModalIds.CreateNoteModal);
        break;
      }
      case "category": {
        openModal(ModalIds.CreateCategoryModal);
        break;
      }
      case "options": {
        openModal(ModalIds.OptionsModal);
        break;
      }
      default:
        break;
    }
  }, [router.query, isMounted]);

  return (
    <>
      {note ? (
        <Seo
          url={`https://notey.caspertheghost.me/app?noteId=${note._id}`}
          title={`${note.title} - notey.app`}
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

      {/* Don't render this modal when the user still needs to enter their PIN */}
      {!pinRequired ? (
        <>
          <ManageNoteModal />
        </>
      ) : null}
    </>
  );
};

const mapToProps = (state: State) => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
  note: state.notes.note,
  pinRequired: state.notes.pinRequired,
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const store = initializeStore();
  const cookie = ctx.req.headers.cookie;

  await checkAuth(cookie)(store.dispatch);
  await getNotes(cookie)(store.dispatch);
  await getCategories(cookie)(store.dispatch);
  await getNoteById(`${ctx.query.noteId}`, false, cookie)(store.dispatch);

  return { props: { initialReduxState: store.getState() } };
};

export default connect(mapToProps)(AppPage);
