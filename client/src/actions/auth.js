import { AUTHENTICATE, SET_LOADING, SET_PIN_CODE } from "../utils/types";
import { handleRequest, isSuccess } from "../utils/functions";
import { toast } from "react-toastify";

const noError = "An unexpected error occurred, please try again later";

export const signIn = (data, location) => (dispatch) => {
  dispatch({ type: SET_LOADING, loading: true });
  handleRequest("/auth/signin", "POST", data)
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: AUTHENTICATE, user: res.data.user, isAuth: true });
        window.location = location ? `/#${location}` : "/#/app";
      } else {
        toast.error(res.data.error);
      }
      dispatch({ type: SET_LOADING, loading: false });
    })
    .catch((e) => {
      console.error(e);
      toast.error(noError);
      dispatch({ type: SET_LOADING, loading: false });
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
        toast.error(res.data.error);
      }
      dispatch({ type: SET_LOADING, loading: false });
    })
    .catch((e) => {
      console.error(e);
      toast.error(noError);
      dispatch({ type: SET_LOADING, loading: false });
    });
};

export const checkAuth = () => (dispatch) => {
  handleRequest("/auth/user", "POST")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: AUTHENTICATE, user: res.data.user, isAuth: true });
      } else {
        toast.error(res.data.error);
      }
    })
    .catch((e) => console.error(e));
};

export const logout = () => (dispatch) => {
  handleRequest("/auth/logout", "GET")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: AUTHENTICATE, user: {}, isAuth: false });
      }
    })
    .catch((e) => console.error(e));
};

export const deleteAccount = () => (dispatch) => {
  handleRequest("/auth/delete-account", "DELETE")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: AUTHENTICATE, user: {}, isAuth: false });
      }
    })
    .catch((e) => console.error(e));
};

export const setPinCode = (pin) => async (dispatch) => {
  return handleRequest("/auth/set-pin", "POST", { pin })
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({
          type: SET_PIN_CODE,
        });

        toast.success("Successfully updated PIN code");
        return true;
      }
    })
    .catch((e) => {
      console.error(e);
      toast.error(noError);
      return false;
    });
};
