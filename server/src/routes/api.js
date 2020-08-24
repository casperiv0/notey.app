const api = require("express").Router();

const notesRouter = require("./notes");
const authRouter = require("./auth");
const categoryRouter = require("./category");

api.use("/notes", notesRouter);
api.use("/auth", authRouter);
api.use("/categories", categoryRouter);

module.exports = api;
