const jwt = require("jsonwebtoken");
const Note = require("../models/Note.model");
const createDomPurify = require("dompurify");
const marked = require("marked");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

function isAuth(req, res, next) {
  const token = req.cookies.__token;

  if (!token) {
    return res
      .json({ server_error: "invalid token", status: "error", code: 401 })
      .status(401);
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    next();
  } catch {
    return res
      .json({ server_error: "invalid token", status: "error", code: 401 })
      .status(401);
  }
}

function notFound(req, res) {
  res.send({ server_error: "Not found", status: "error" }).status(400);
}

/**
 *
 * @param {String} userId The Id of user
 */
function getUserNotes(userId) {
  return Note.find({ user_id: userId });
}

/**
 * @param {String} body The body that will be converted to markdown
 * @returns {String} Created markdown
 */
function convertToMarkdown(body) {
  return dompurify.sanitize(marked(body));
}

module.exports = {
  isAuth,
  notFound,
  getUserNotes,
  convertToMarkdown,
};
