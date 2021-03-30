import { connect } from "mongoose";
import Logger from "./logger";

(async function database() {
  const uri = String(process.env.MONGO_URI);

  try {
    connect(uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    Logger.log("DATABASE", "Connected to mongodb");
  } catch (e) {
    Logger.error("db_error", e);
  }
})();
