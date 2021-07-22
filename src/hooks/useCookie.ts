import { serialize, CookieSerializeOptions } from "cookie";
import { NextApiResponse } from "next";

interface CookieOptions {
  res: NextApiResponse;
  name: string;
  value: unknown;
  expires: number;
}

export default function useCookie(opts: CookieOptions) {
  const stringValue =
    typeof opts.value === "object" ? `j:${JSON.stringify(opts.value)}` : String(opts.value);

  const options: CookieSerializeOptions = {
    expires: new Date(Date.now() + opts.expires),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
  };

  opts.res.setHeader("Set-Cookie", serialize(opts.name, String(stringValue), options));
}
