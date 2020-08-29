const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuth } = require("../utils/functions");
const Note = require("../models/Note.model");
const Category = require("../models/Category.model");

router.post("/login", async (req, res) => {
  const { username, password, rememberMe } = req.body;

  if (username && password) {
    // check if user exists
    let expires = 3600000; // 1 hour

    const user = await User.findOne({ username }).catch((e) => console.log(e));

    if (!user) return res.json({ error: "User not found", status: "error" });

    // check if password is correct
    const passwordIsCorrect = bcrypt.compareSync(password, user.password);

    if (!passwordIsCorrect)
      return res.json({ error: "Incorrect password", status: "error" });

    if (rememberMe) {
      expires = 2629800000; // 1 month
    }

    // generate token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: expires / 1000 }
    );

    res.cookie("__token", token, {
      expires: new Date(Date.now() + expires),
      httpOnly: true,
      sameSite: true,
    }); // expires after 1hour

    return res.json({
      msg: "Loggedin",
      status: "success",
      user: { username: user.username, id: user._id },
    });
  } else {
    return res.json({ error: "Please fill in all fields", status: "error" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, password, password2 } = req.body;

  if (username && password && password2) {
    if (password !== password2) {
      return res.json({ error: "Passwords do not match!", status: "error" });
    }

    // check if user exists
    const user = await User.findOne({ username }).catch((e) => console.log(e));

    if (user) {
      return res.json({
        error: "username is already in use!",
        status: "error",
      });
    }

    // Hash password
    const hash = bcrypt.hashSync(password, 15);

    const newUser = new User({ username, password: hash });

    newUser.save().catch((e) => console.log(e));

    // generate token
    const token = jwt.sign(
      {
        id: await newUser._id,
        username: username,
      },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    );

    res.cookie("__token", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    }); // expires after 1hour

    return res.json({
      msg: "Loggedin",
      status: "success",
      user: { username: username, id: await newUser._id },
    });
  } else {
    return res.json({ error: "Please fill in all fields", status: "error" });
  }
});

router.post("/user", isAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select({ password: 0 });

  return res.json({ user, status: "success" });
});

router.get("/logout", isAuth, async (req, res) => {
  res.clearCookie("__token", { httpOnly: true });

  return res.json({ status: "success" });
});

router.delete("/delete-account", isAuth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const notes = await Note.find({ user_id: user._id }).catch((e) =>
    console.log(e)
  );
  const categories = await Category.find({ user_id: user._id }).catch((e) =>
    console.log(e)
  );

  try {
    // delete all notes
    notes.forEach(async (note) => {
      await Note.findByIdAndDelete(note._id).catch((e) => console.log(e));
    });

    // Delete all categories
    categories.forEach(async (cat) => {
      await Category.findByIdAndDelete(cat._id).catch((e) => console.log(e));
    });

    // delete user
    await User.findByIdAndDelete(user._id);
    res.clearCookie("__token", { httpOnly: true });
  } catch (e) {
    console.log(e);
  }

  res.json({ status: "success", msg: "account was deleted" });
});

module.exports = router;
