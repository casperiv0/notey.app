const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  const token = req.cookies.__token;
  if (!token) return res.json({ msg: "Invalid Token", status: "error" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    next();
  } catch {
    return res.json({ msg: "Invalid Token", status: "error" });
  }
}

module.exports = {
  isAuth,
};
