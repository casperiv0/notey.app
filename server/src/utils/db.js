const { connect } = require("mongoose");
const { MONGO_URI } = process.env;
const Logger = require("./Logger");
const logger = new Logger();

async function db() {
  try {
    await connect(MONGO_URI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    logger.connected();
  } catch (e) {
    console.log(e);
  }
}

module.exports = db;
