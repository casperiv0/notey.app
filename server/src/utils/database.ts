import { connect } from "mongoose";
import { logger } from "./Logger";

(async function database() {
  const uri = String(process.env.MONGO_URI);

  try {
    connect(uri, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.mongo();
  } catch (e) {
    console.log(e);
  }
})();
