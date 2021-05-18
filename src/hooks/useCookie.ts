import { serialize, CookieSerializeOptions } from "cookie";
import { NextApiResponse } from "next";

export default function useCookie(
  res: NextApiResponse,
  name: string,
  value: unknown,
  expires: number,
) {
  const stringValue = typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);

  const options: CookieSerializeOptions = {
    expires: new Date(Date.now() + expires),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
  };

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
}
