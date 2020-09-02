import { Router } from "express";
import notesRouter from "./notes";
import authRouter from "./auth";

const api: Router = Router();

api.use("/notes", notesRouter);
api.use("/auth", authRouter);

export default api;
