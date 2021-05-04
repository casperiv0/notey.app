import axios, { AxiosResponse } from "axios";
import { ModalIds, NO_ERROR } from "./constants";
import { ALLOWED_METHODS } from "./shared";
import { openModal } from "./utils";

export type RequestData = Record<string, unknown>;

export const handleRequest = (
  path: string,
  method: ALLOWED_METHODS,
  data?:
    | RequestData
    | {
        cookie: string;
      },
) => {
  return axios({
    url: `${process.env.NEXT_PUBLIC_PROD_ORIGIN}/api${path}`,
    method,
    data: data ? data : null,
    withCredentials: true,
    headers: {
      Session: (data?.cookie as string)?.split("notey-session=")?.[1] ?? "",
      "Content-Type": "application/json",
    },
  });
};

export const isSuccess = (res: AxiosResponse): boolean => {
  return res.data.status === "success";
};

export const getErrorFromResponse = (e: any) => {
  if (e?.message?.toLowerCase?.().includes("failed with status code 429")) {
    openModal(ModalIds.AlertTooManyRequests);
    return null;
  }

  return e?.response?.data?.errors?.[0] ?? e?.response?.data?.error ?? NO_ERROR;
};
