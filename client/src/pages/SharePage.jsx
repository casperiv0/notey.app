import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getShareById } from "../actions/notes";
import { NotePreview } from "../components/note/notes.style";
import { checkAuth } from "../actions/auth";

const loginStyles = {
  padding: "0.5rem 1rem",
  background: "#3A3B3C",
  color: "#f2f2f2",
  display: "inline-block",
  fontSize: "1.2rem",
  textAlign: "center",
  textDecoration: "none",
  marginRight: "1rem",
  borderRadius: "0.5rem",
};

const SharePage = ({
  share,
  getShareById,
  match,
  isAuth,
  checkAuth,
  error,
}) => {
  const noteId = match.params.noteId;

  useEffect(() => {
    checkAuth();
  });

  useEffect(() => {
    getShareById(noteId);
  }, [getShareById, noteId]);

  return (
    <div style={{ padding: "1rem", color: "#f2f2f2" }}>
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
      {error ? (
        error
      ) : (
        <>
          <h1 style={{ borderBottom: "2px solid #f2f2f2", margin: "1rem 0" }}>
            {share?.title}
          </h1>

          <NotePreview
            dangerouslySetInnerHTML={{ __html: share?.markdown }}
          ></NotePreview>
        </>
      )}
    </div>
  );
};

const mapToProps = (state) => ({
  share: state.note.share,
  error: state.note.error,
  isAuth: state.auth.isAuth,
});

export default connect(mapToProps, { getShareById, checkAuth })(SharePage);
