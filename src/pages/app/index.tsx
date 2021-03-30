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

interface Props {
  isAuth: boolean;
  loading: boolean;
}

const AppPage: NextPage<Props> = ({ loading, isAuth }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !isAuth) {
      router.push("/auth/login");
    }
  }, [isAuth, loading, router]);

  return (
    <>
      <Head>
        <title>Notey.app - Keep track of important things</title>
        <link rel="canonical" href="https://notey.caspertheghost.me/app" />
      </Head>

      <AppLayout>
        <Sidebar />

        <Main />
      </AppLayout>
      <CreateNoteModal />
      <CreateCategoryModal />
    </>
  );
};

const mapToProps = (state: State) => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
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
