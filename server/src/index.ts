import "dotenv/config";
import "./utils/database";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import api from "./routes/api";
import { logger } from "./utils/Logger";

const app: Application = express();
const port = process.env.PORT || 3030;

app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/v2", api);

app.listen(port, () => logger.listening(Number(port)));
