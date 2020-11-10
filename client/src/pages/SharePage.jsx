import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getShareById } from "../actions/notes";
import AlertMessages from "../components/AlertMessages";
import { GREEN, PRIMARY } from "../styles/colors";
import { NotePreview } from "../components/note/notes.style";
import { checkAuth } from "../actions/auth";

const loginStyles = {
  padding: "0.5rem 1rem",
  background: GREEN,
  color: PRIMARY,
  display: "inline-block",
  fontSize: "1.2rem",
  textAlign: "center",
  textDecoration: "none",
  marginRight: "1rem",
};

const SharePage = ({ share, getShareById, match, isAuth, checkAuth}) => {
  const noteId = match.params.noteId;

  useEffect(() => {
    checkAuth();
  });

  useEffect(() => {
    getShareById(noteId);
  }, [getShareById, noteId]);

  return (
    <div style={{ padding: "1rem", color: GREEN }}>
      {isAuth ? (
        <a style={loginStyles} href={`/#/app?noteId=${noteId}`}>
          Open app
        </a>
      ) : (
        <>
          <a style={loginStyles} href="/#/signin">
            Sign In
          </a>
          <a style={loginStyles} href="/#/signup">
            Create an Account
          </a>
        </>
      )}
      <h1 style={{ borderBottom: `2px solid ${GREEN}`, margin: "1rem 0" }}>
        {share?.title}
      </h1>

      <NotePreview
        dangerouslySetInnerHTML={{ __html: share?.markdown }}
      ></NotePreview>
      <AlertMessages />
    </div>
  );
};

const mapToProps = (state) => ({
  share: state.note.share,
  isAuth: state.auth.isAuth,
});

export default connect(mapToProps, { getShareById, checkAuth })(SharePage);
