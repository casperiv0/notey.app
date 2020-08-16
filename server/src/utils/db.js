const { connect } = require("mongoose");

function db() {
  connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .then(() => console.log("Connected to mongodb"))
    .catch((e) => console.log(e));
}

module.exports = db;
