import axios, { AxiosResponse, AxiosError } from "axios";
import cookie from "cookie";
import { ModalIds, NO_ERROR, ALLOWED_METHODS } from "./constants";
import { openModal } from "./utils";

export type RequestData = Record<string, unknown>;

export const handleRequest = <T = any>(
  path: string,
  method: ALLOWED_METHODS,
  data?:
    | RequestData
    | {
        cookie: string;
      },
): Promise<AxiosResponse<T>> => {
  const parsedCookie = cookie.parse((data?.cookie as string) ?? "")?.["notey-session"];

  return axios({
    url: `${process.env.NEXT_PUBLIC_PROD_ORIGIN}/api${path}`,
    method,
    data: data ? data : null,
    withCredentials: true,
    headers: {
      Session: parsedCookie,
      "Content-Type": "application/json",
    },
  });
};

export const isSuccess = (res: AxiosResponse<any>): boolean => {
  return res.data.status === "success";
};

export const getErrorFromResponse = (e: unknown) => {
  const error = e instanceof Error && (e as Error | AxiosError<any>);

  if (!error) {
    return NO_ERROR;
  }

  if (error.message?.toLowerCase?.().includes("failed with status code 429")) {
    openModal(ModalIds.AlertTooManyRequests);
    return null;
  }

  if ("response" in error) {
    return error.response?.data.errors?.[0] ?? error?.response?.data?.error ?? NO_ERROR;
  }

  return error.message ?? NO_ERROR;
};
