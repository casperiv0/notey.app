import { createHandler, Get } from "@storyofams/next-api-decorators";

class ApiManager {
  private endpoints = [
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
  ];

  @Get()
  async returnAllEndpoints() {
    return {
      message: "Welcome to notey.app's API",
      status: "success",
      endpoints: this.endpoints,
    };
  }
}

export default createHandler(ApiManager);
