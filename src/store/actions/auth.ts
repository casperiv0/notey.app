import { toast } from "react-toastify";
import { handleRequest, isSuccess, RequestData } from "@lib/fetch";
import { AUTHENTICATE, SET_AUTH_LOADING } from "../types";
import { NO_ERROR } from "@lib/constants";

export const authenticate = (data: RequestData) => async (dispatch): Promise<boolean> => {
  dispatch({ type: SET_AUTH_LOADING, loading: true });

  try {
    const res = await handleRequest("/auth/login", "POST", data);

    if (isSuccess(res)) {
      dispatch({
        type: AUTHENTICATE,
        user: res.data.user,
        isAuth: true,
      });

      return true;
    } else {
      toast.error(res.data.error);
      return false;
    }
  } catch (e) {
    console.log(e);

    toast.error(e?.response?.data?.error ?? NO_ERROR);
    dispatch({ type: SET_AUTH_LOADING, loading: false });
    return false;
  }
};

export const checkAuth = (cookie?: string) => async (dispatch) => {
  try {
    const res = await handleRequest("/auth/me", "POST", {
      cookie,
    });

    if (isSuccess(res)) {
      dispatch({
        type: AUTHENTICATE,
        isAuth: true,
        user: res.data.user,
      });
    }
  } catch (e) {
    dispatch({ type: SET_AUTH_LOADING, loading: false });
    return null;
  }
};

export const logout = () => async (dispatch): Promise<void> => {
  try {
    const res = await handleRequest("/auth/logout", "POST");

    if (isSuccess(res)) {
      dispatch({
        type: AUTHENTICATE,
        user: null,
        isAuth: false,
      });
    } else {
      toast.error(res.data.error);
    }
  } catch (e) {
    toast.error(e?.response.data?.error ?? NO_ERROR);
    dispatch({ type: SET_AUTH_LOADING, loading: false });
  }
};
