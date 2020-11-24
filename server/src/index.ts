import "dotenv/config";
import "./utils/database";
import express, { json, Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import api from "./routes/api";
import Logger from "./utils/Logger";

const app: Application = express();
const port = process.env.PORT || 3030;

app.use(compression());
app.use(json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/v2", api);

app.use((_req: Request, res: Response) => {
  res.json({ server_error: "Not found", code: 404 }).status(404);
});

app.listen(port, () => Logger.listening(Number(port)));
