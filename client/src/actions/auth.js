import { AUTHENTICATE, AUTH_ERR, SET_LOADING } from "../utils/types";
import { handleRequest, isSuccess } from "../utils/functions";

const noError =
  "Something went wrong making the request, please try again later";

export const signIn = (data, location) => (dispatch) => {
  dispatch({ type: SET_LOADING, loading: true });
  handleRequest("/auth/signin", "POST", data)
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: AUTHENTICATE, user: res.data.user, isAuth: true });
        window.location = location ? `/#${location}` : "/#/app";
      } else {
        dispatch({ type: AUTH_ERR, error: res.data.error });
      }
      dispatch({ type: SET_LOADING, loading: false });
    })
    .catch((e) => {
      console.log(e);
      dispatch({ type: AUTH_ERR, error: noError });
    });
};

export const signUp = (data) => (dispatch) => {
  dispatch({ type: SET_LOADING, loading: true });

  handleRequest("/auth/signup", "POST", data)
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: AUTHENTICATE, user: res.data.user, isAuth: true });
        window.location = "/#/app";
      } else {
        dispatch({ type: AUTH_ERR, error: res.data.error });
      }
      dispatch({ type: SET_LOADING, loading: false });
    })
    .catch((e) => {
      console.log(e);
      dispatch({ type: AUTH_ERR, error: noError });
    });
};

export const checkAuth = () => (dispatch) => {
  handleRequest("/auth/user", "POST")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: AUTHENTICATE, user: res.data.user, isAuth: true });
      } else {
        dispatch({ type: AUTH_ERR, error: res.data.error });
      }
    })
    .catch((e) => console.log(e));
};

export const logout = () => (dispatch) => {
  handleRequest("/auth/logout", "GET")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: AUTHENTICATE, user: {}, isAuth: false });
      }
    })
    .catch((e) => console.log(e));
};

export const deleteAccount = () => (dispatch) => {
  handleRequest("/auth/delete-account", "DELETE")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: AUTHENTICATE, user: {}, isAuth: false });
      }
    })
    .catch((e) => console.log(e));
};
