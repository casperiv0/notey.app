import { Router, Response } from "express";
import notesRouter from "./notes";
import authRouter from "./auth";
import categoriesRouter from "./categories";

const api: Router = Router();

api.get("/", (_req, res: Response) => {
  return res.json({
    msg: "Welcome to notey.app's API",
    status: "success",
  });
});

api.use("/auth", authRouter);
api.use("/notes", notesRouter);
api.use("/categories", categoriesRouter);

export default api;
