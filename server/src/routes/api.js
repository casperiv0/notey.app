const api = require("express").Router();

const notesRouter = require("./notes");
const authRouter = require("./auth");

api.use("/notes", notesRouter);
api.use("/auth", authRouter);

module.exports = api;
