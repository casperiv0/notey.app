const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  const token = req.cookies.__token;
  if (!token) return res.json({ server_error: "invalid token", status: "error" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    next();
  } catch {
    return res.json({ server_error: "invalid token", status: "error" });
  }
}

function notFound(req, res) {
  res.send({ server_error: "Not found", status: "error" });
}

module.exports = {
  isAuth,
  notFound,
};
