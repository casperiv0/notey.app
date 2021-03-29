import "dotenv/config";
import "./utils/database";
import express, { Application } from "express";
import api from "./routes/api";
import { join } from "path";

const app: Application = express();
const port = process.env.PORT || 3030;

app.use("/api/v2", api);

app.use(express.static(join(__dirname, "../../client/build")));
app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "../../client/build", "index.html"));
});

app.listen(port, () => Logger.listening(Number(port)));
