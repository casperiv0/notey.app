const api = require("express").Router();

const notesRouter = require("./notes");
const authRouter = require("./auth");
const categoryRouter = require("./category");

api.get("/", (req, res) => {
  return res.redirect(process.env.CLIENT_URL);
});

api.use("/notes", notesRouter);
api.use("/auth", authRouter);
api.use("/categories", categoryRouter);

module.exports = api;
