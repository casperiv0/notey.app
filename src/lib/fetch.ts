import axios, { AxiosResponse } from "axios";
import { ALLOWED_METHODS } from "./shared";

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