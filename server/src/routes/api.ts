import { Router } from "express";
import notesRouter from "./notes";
import authRouter from "./auth";
import categoriesRouter from "./categories";

const api: Router = Router();

api.use("/auth", authRouter);
api.use("/notes", notesRouter);
api.use("/categories", categoriesRouter);

export default api;
