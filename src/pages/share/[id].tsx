import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import { LinkStyle, ShareStyle, ShareTitle, ShareFooter } from "@styles/Share";
import { getShareById } from "actions/note";
import { verifyAuth } from "actions/auth";
import NotePreview from "@components/note/NotePreview";
import Loader from "@components/loader/Loader";
import Seo from "@components/Seo";
import { useStore } from "store/StoreProvider";

const SharePage = () => {
  const router = useRouter();
  const store = useStore();

  React.useEffect(() => {
    if (!store.note?._id) {
      router.push("/404");
    }
  }, [store.note?._id, router]);

  if (!store.note) {
    return <Loader fullSize center />;
  }

  return (
    <>
      <Seo
        title={`${store.note.title} - notey.app`}
        url={`https://notey.caspertheghost.me/share/${store.note._id}`}
      />

      <ShareStyle>
        {store.isAuth ? (
          <Link href={`/app?noteId=${store.note?._id}`}>
            <LinkStyle href={`/app?noteId=${store.note?._id}`}>Return to app</LinkStyle>
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
        <ShareTitle>{store.note?.title}</ShareTitle>

        <NotePreview note={store.note} />

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
  const share = await getShareById(ctx.query.id?.toString()!, ctx.req.headers.cookie);
  const auth = await verifyAuth(ctx.req.headers.cookie);

  return { props: { initialState: { ...auth, ...share } } };
};

export default observer(SharePage);
