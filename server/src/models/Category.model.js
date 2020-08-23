const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    max: 20,
  },
  created_at: {
    type: String,
    required: true,
  },
});

module.exports = model("Category", categorySchema);
