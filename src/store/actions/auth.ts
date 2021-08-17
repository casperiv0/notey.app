import { toast } from "react-toastify";
import { getErrorFromResponse, handleRequest, isSuccess, RequestData } from "@lib/fetch";
import { Dis, UpdatePinCode } from "../types";

export async function authenticate(data: RequestData, login: boolean) {
  try {
    const res = await handleRequest(`/auth/${login ? "login" : "register"}`, "POST", data);

    if (isSuccess(res)) {
      return {
        user: res.data.user,
        isAuth: true,
      };
    }

    toast.error(res.data.error);
    return null;
  } catch (e) {
    console.error(e);

    toast.error(getErrorFromResponse(e));
    return null;
  }
}

export async function verifyAuth(cookie?: string) {
  try {
    const res = await handleRequest("/auth/me", "POST", {
      cookie,
    });

    if (isSuccess(res)) {
      return { user: res.data.user, isAuth: !!res.data.user };
    }
  } catch (e) {
    return { error: e.message };
  }
}

export async function logout() {
  try {
    const res = await handleRequest("/auth/logout", "POST");

    if (isSuccess(res)) {
      return {
        user: null,
        isAuth: false,
      };
    }

    return { error: res.data.error };
  } catch (e) {
    return { error: getErrorFromResponse(e) };
  }
}

export async function deleteAccount() {
  try {
    const res = await handleRequest("/auth/me", "DELETE");

    if (isSuccess(res)) {
      return {
        user: null,
        isAuth: false,
      };
    }

    toast.error(res.data.error);
    return null;
  } catch (e) {
    toast.error(getErrorFromResponse(e));
    return null;
  }
}

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
