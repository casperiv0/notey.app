require("dotenv").config();
require("./utils/db")();

const Logger = require("./utils/Logger");
const logger = new Logger();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { notFound } = require("./utils/functions");

const app = express();
const port = process.env.PORT || 3030;

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/v1", require("./routes/api"));

app.use((req, res) => {
  notFound(req, res);
});

app.listen(port, () => logger.started(port));
