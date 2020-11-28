import { connect } from "mongoose";
import Logger from "./Logger";

(async function database() {
  const uri = String(process.env.MONGO_URI);

  try {
    connect(uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    Logger.mongo();
  } catch (e) {
    Logger.error("db_error", e);
  }
})();
