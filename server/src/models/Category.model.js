const { Schema, model } = require("mongoose");
const moment = require("moment");

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
    default: () => moment().format("MM/DD/YYYY"),
  },
});

module.exports = model("Category", categorySchema);
