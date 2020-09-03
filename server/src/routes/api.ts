import { Router } from "express";
import notesRouter from "./notes";
import authRouter from "./auth";

const api: Router = Router();

api.use("/auth", authRouter);
api.use("/notes", notesRouter);

export default api;
