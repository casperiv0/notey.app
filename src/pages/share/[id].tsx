import Head from "next/head";
import * as React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { initializeStore } from "src/store/store";
import State from "types/State";
import { LinkStyle, ShareStyle, ShareTitle, ShareFooter } from "@styles/Share";
import { getNoteById } from "@actions/note";
import { checkAuth } from "@actions/auth";
import Note from "types/Note";
import NotePreview from "@components/note/NotePreview";

interface Props {
  note: Note | null;
  isAuth: boolean;
}

const SharePage: NextPage<Props> = ({ note, isAuth }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!note?._id) {
      router.push("/404");
    }
  }, [note?._id, router]);

  return (
    <>
      <Head>
        <title>{note?.title} - notey.app</title>
      </Head>
      <ToastContainer />
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

        {/* //TODO: add NotePreview component */}
        <NotePreview note={note} />

        <ShareFooter>
          Created by{" "}
          <a target="_blank" rel="noopener noreferrer" href="https://caspertheghost.me">
            CasperTheGhost
          </a>
        </ShareFooter>
      </ShareStyle>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const store = initializeStore();
  await getNoteById(`${ctx.query.id}`, ctx.req.headers.cookie)(store.dispatch);
  await checkAuth(ctx.req.headers.cookie)(store.dispatch);

  return { props: { initialReduxState: store.getState() } };
};

const mapToProps = (state: State) => ({
  note: state.notes.note,
  isAuth: state.auth.isAuth,
});

export default connect(mapToProps)(SharePage);
