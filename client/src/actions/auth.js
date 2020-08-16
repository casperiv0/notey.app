import { AUTHENTICATE, AUTH_ERR } from "../utils/types";
import { handleRequest, isSuccess } from "../utils/functions";

export const login = (data) => (dispatch) => {
  handleRequest("/auth/login", "POST", data)
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: AUTHENTICATE, user: res.data.user, isAuth: true });
        window.location = "/#/";
      } else {
        dispatch({ type: AUTH_ERR, error: res.data.error });
      }
    })
    .catch((e) => console.log(e));
};

export const register = (data) => (dispatch) => {
  handleRequest("/auth/register", "POST", data)
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: AUTHENTICATE, user: res.data.user, isAuth: true });
        window.location = "/#/";
      } else {
        dispatch({ type: AUTH_ERR, error: res.data.error });
      }
    })
    .catch((e) => console.log(e));
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
