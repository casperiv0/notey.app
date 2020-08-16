const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    max: 40,
  },
  body: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
});

module.exports = model("Note", noteSchema);
