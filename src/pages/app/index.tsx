import { checkAuth } from "@actions/auth";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";
import { initializeStore } from "src/store/store";
import State from "types/State";
import { getNoteById, getNotes } from "@actions/note";
import Sidebar from "@components/sidebar/Sidebar";
import { getCategories } from "@actions/categories";
import CreateCategoryModal from "@components/modals/CreateCategory";
import CreateNoteModal from "@components/modals/CreateNote";
import { AppLayout } from "@styles/Global";
import Main from "@components/main/Main";
import Note from "types/Note";
import ManageNoteModal from "@components/modals/ManageNote";
import OptionsModal from "@components/modals/OptionsModal";
import { openModal } from "@lib/utils";
import useMounted from "@hooks/useMounted";
import { ModalIds } from "@lib/constants";

interface Props {
  isAuth: boolean;
  loading: boolean;
  note: Note | null;
}

const AppPage: NextPage<Props> = ({ loading, isAuth, note }) => {
  const router = useRouter();
  const isMounted = useMounted();

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
      <Head>
        {note ? (
          <>
            <title>{note?.title} - notey.app</title>
            <meta
              property="og:url"
              content={`https://notey.caspertheghost.me/app?noteId=${note._id}`}
            />
            <meta property="og:title" content={`${note?.title} - notey.app`} />
            <link rel="canonical" href={`https://notey.caspertheghost.me/app?noteId=${note._id}`} />
            <meta name="twitter:title" content={`${note.title} - notey.app`} />
          </>
        ) : (
          <>
            <title>Notey.app - Keep track of important things</title>
            <link rel="canonical" href="https://notey.caspertheghost.me/app" />
            <meta property="og:url" content="https://notey.caspertheghost.me/app" />
            <meta property="og:title" content="Notey.app - Keep track of important things" />
            <meta name="twitter:title" content="Notey.app - Keep track of important things" />
          </>
        )}
      </Head>

      <AppLayout>
        <Sidebar />

        <Main />
      </AppLayout>

      <OptionsModal />
      <ManageNoteModal />
      <CreateNoteModal />
      <CreateCategoryModal />
    </>
  );
};

const mapToProps = (state: State) => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
  note: state.notes.note,
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
