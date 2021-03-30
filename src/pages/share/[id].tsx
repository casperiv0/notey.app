import Head from "next/head";
import * as React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { initializeStore } from "src/store/store";
import State from "types/State";
import { LinkStyle, ShareStyle, ShareTitle, ShareFooter } from "@styles/Share";
import { getNoteById } from "@actions/note";
import { checkAuth } from "@actions/auth";
import Note from "types/Note";
import NotePreview from "@components/note/NotePreview";
import Loader from "@components/loader/Loader";

interface Props {
  note: Note | null;
  isAuth: boolean;
  loading: boolean;
}

const SharePage: NextPage<Props> = ({ loading, note, isAuth }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !note?._id) {
      router.push("/404");
    }
  }, [note?._id, router, loading]);

  if (!note) {
    return <Loader fullSize center />;
  }

  return (
    <>
      <Head>
        <title>{note?.title} - notey.app</title>
      </Head>

      {loading ? (
        <Loader fullSize center />
      ) : (
        <ShareStyle>
          {isAuth ? (
            <Link href={`/app?noteId=${note?._id}`}>
              <LinkStyle href={`/app?noteId=${note?._id}`}>Return to app</LinkStyle>
            </Link>
          ) : (
            <>
              <Link href="/auth/login">
                <LinkStyle href="/auth/login">Login</LinkStyle>
              </Link>
              <Link href="/auth/register">
                <LinkStyle href="/auth/register">Create an Account</LinkStyle>
              </Link>
            </>
          )}
          <ShareTitle>{note?.title}</ShareTitle>

          <NotePreview note={note} />

          <ShareFooter>
            Created by{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://caspertheghost.me">
              CasperTheGhost
            </a>
          </ShareFooter>
        </ShareStyle>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const store = initializeStore();
  await getNoteById(`${ctx.query.id}`, true, ctx.req.headers.cookie)(store.dispatch);
  await checkAuth(ctx.req.headers.cookie)(store.dispatch);

  return { props: { initialReduxState: store.getState() } };
};

const mapToProps = (state: State) => ({
  note: state.notes.note,
  isAuth: state.auth.isAuth,
  loading: state.notes.loading,
});

export default connect(mapToProps)(SharePage);
