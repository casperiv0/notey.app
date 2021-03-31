import { NextApiResponse } from "next";

export default async function handler(_, res: NextApiResponse) {
  return res.json({
    message: "Welcome to notey.app's API",
    status: "success",
    endpoints: [
      "POST /api/auth/login",
      "POST /api/auth/register",
      "POST /api/auth/me",
      "DELETE /api/auth/me",
      "POST /api/auth/logout",
      "GET /api/notes",
      "POST /api/notes",
      "GET /api/notes/:noteId",
      "GET /api/notes/share/:noteId",
      "PUT /api/notes/:noteId",
      "DELETE /api/notes/:noteId",
      "GET /api/categories",
      "POST /api/categories",
      "DELETE /api/categories/:noteId",
    ],
  });
}
