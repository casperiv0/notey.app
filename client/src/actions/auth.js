import { AUTHENTICATE, SET_LOADING, SET_PIN_CODE } from "../utils/types";
import { handleRequest, isSuccess } from "../utils/functions";
import { toast } from "react-toastify";

const noError = "An unexpected error occurred, please try again later";

export const signIn = (data) => async (dispatch) => {
  dispatch({ type: SET_LOADING, loading: true });

  return handleRequest("/auth/signin", "POST", data)
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: AUTHENTICATE, user: res.data.user, isAuth: true });
        dispatch({ type: SET_LOADING, loading: false });
        return true;
      } else {
        toast.error(res.data.error);
      }
      dispatch({ type: SET_LOADING, loading: false });
      return false;
    })
    .catch((e) => {
      console.error(e);
      toast.error(noError);
      dispatch({ type: SET_LOADING, loading: false });
      return false;
    });
};

export const signUp = (data) => async (dispatch) => {
  dispatch({ type: SET_LOADING, loading: true });

  return handleRequest("/auth/signup", "POST", data)
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: AUTHENTICATE, user: res.data.user, isAuth: true });
        return true;
      } else {
        toast.error(res.data.error);
        dispatch({ type: SET_LOADING, loading: false });
        return false;
      }
    })
    .catch((e) => {
      console.error(e);
      toast.error(noError);
      dispatch({ type: SET_LOADING, loading: false });
      return false;
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
