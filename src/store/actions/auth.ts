import { toast } from "react-toastify";
import { getErrorFromResponse, handleRequest, isSuccess, RequestData } from "@lib/fetch";
import { Dis, Authenticate, UpdatePinCode } from "../types";

export const authenticate =
  (data: RequestData, login: boolean) =>
  async (dispatch: Dis<Authenticate>): Promise<boolean> => {
    dispatch({ type: "SET_AUTH_LOADING", loading: true });

    try {
      const res = await handleRequest(`/auth/${login ? "login" : "register"}`, "POST", data);

      if (isSuccess(res)) {
        dispatch({
          type: "AUTHENTICATE",
          user: res.data.user,
          isAuth: true,
        });

        return true;
      }

      toast.error(res.data.error);
      return false;
    } catch (e) {
      console.error(e);

      toast.error(getErrorFromResponse(e));
      dispatch({ type: "SET_AUTH_LOADING", loading: false });
      return false;
    }
  };

export const checkAuth = (cookie?: string) => async (dispatch: Dis<Authenticate>) => {
  try {
    const res = await handleRequest("/auth/me", "POST", {
      cookie,
    });

    if (isSuccess(res)) {
      dispatch({
        type: "AUTHENTICATE",
        isAuth: true,
        user: res.data.user,
      });
    }
  } catch (e) {
    dispatch({ type: "SET_AUTH_LOADING", loading: false });
    return null;
  }
};

export const logout =
  () =>
  async (dispatch: Dis<Authenticate>): Promise<void> => {
    try {
      const res = await handleRequest("/auth/logout", "POST");

      if (isSuccess(res)) {
        dispatch({
          type: "AUTHENTICATE",
          user: null,
          isAuth: false,
        });
      } else {
        toast.error(res.data.error);
      }
    } catch (e) {
      toast.error(getErrorFromResponse(e));
      dispatch({ type: "SET_AUTH_LOADING", loading: false });
    }
  };

export const deleteAccount =
  () =>
  async (dispatch: Dis<Authenticate>): Promise<void> => {
    try {
      const res = await handleRequest("/auth/me", "DELETE");

      if (isSuccess(res)) {
        dispatch({
          type: "AUTHENTICATE",
          user: null,
          isAuth: false,
        });
      } else {
        toast.error(res.data.error);
      }
    } catch (e) {
      toast.error(getErrorFromResponse(e));
      dispatch({ type: "SET_AUTH_LOADING", loading: false });
    }
  };

export const updatePinCode =
  (pin: string) =>
  async (dispatch: Dis<UpdatePinCode>): Promise<boolean> => {
    try {
      const res = await handleRequest("/auth/me/pin", "PUT", { pin });

      if (isSuccess(res)) {
        dispatch({
          type: "UPDATE_PIN_CODE",
        });

        return true;
      }

      toast.error(res.data.error);
      return false;
    } catch (e) {
      toast.error(getErrorFromResponse(e));
      dispatch({ type: "SET_AUTH_LOADING", loading: false });
      return false;
    }
  };
