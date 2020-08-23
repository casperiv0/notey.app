const { Schema, model } = require("mongoose");
const moment = require("moment");

const noteSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  category_id: {
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
  markdown: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    default: () => moment().format("MM/DD/YYYY")
  },
});

module.exports = model("Note", noteSchema);
