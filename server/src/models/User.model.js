const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  last_active_note: {
    type: String,
    required: false,
    default: "None",
  },
});

module.exports = model("User", userSchema);
