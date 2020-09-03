import { connect } from "mongoose";
import { logger } from "./Logger";

(async function database() {
  const uri = String(process.env.MONGO_URI);

  try {
    connect(uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.mongo();
  } catch (e) {
    logger.error(e, "db_error");
  }
})();
