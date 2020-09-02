import { Router } from "express";
import notesRouter from "./notes";

const api: Router = Router();

api.use("/notes", notesRouter);

export default api;
