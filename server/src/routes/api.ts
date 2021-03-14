import { Router, Response, json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { checkHeaders } from "../middlewares";
import notesRouter from "./notes";
import authRouter from "./auth";
import categoriesRouter from "./categories";

const api: Router = Router();

api.use(compression());
api.use(json());
api.use(cookieParser());
api.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
api.use(helmet());
api.use(morgan("dev"));
api.use(checkHeaders);

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
