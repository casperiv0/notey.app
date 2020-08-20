require("dotenv").config();
require("./utils/db")();

const Logger = require("./utils/Logger");
const logger = new Logger();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
const api = require("./routes/api");
const port = process.env.PORT || 3030;

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/v1", api);

app.listen(port, () => logger.started(port));
