import { connect } from "mongoose";

async function database() {
  const uri = String(process.env.MONGO_URI);

  try {
    connect(uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error(e);
  }
}

database();
