import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getShareById } from "../actions/notes";
import { NotePreview } from "../components/note/notes.style";
import { checkAuth } from "../actions/auth";
import Loader from "../components/Loader";

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

const SharePage = ({ share, getShareById, match, isAuth, checkAuth, loading }) => {
  const noteId = match.params.noteId;

  useEffect(() => {
    checkAuth();
  });

  useEffect(() => {
    getShareById(noteId);
  }, [getShareById, noteId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "1rem", color: "#f2f2f2" }}>
      <ToastContainer />
      {isAuth ? (
        <a style={loginStyles} href={`/#/app?noteId=${noteId}`}>
          Return to app
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
      {share?._id ? (
        <>
          <h1 style={{ borderBottom: "2px solid #f2f2f2", margin: "1rem 0" }}>{share?.title}</h1>

          <NotePreview dangerouslySetInnerHTML={{ __html: share?.markdown }}></NotePreview>
        </>
      ) : null}

      <footer style={{ marginTop: "20px", fontStyle: "italic" }}>
        Created by <a href="https://caspertheghost.me">CasperTheGhost</a>
      </footer>
    </div>
  );
};

const mapToProps = (state) => ({
  share: state.note.share,
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
});

export default connect(mapToProps, { getShareById, checkAuth })(SharePage);
