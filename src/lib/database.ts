import { connect } from "mongoose";

async function database() {
  const uri = String(process.env.MONGO_URI);

  try {
    connect(uri);
  } catch (e) {
    console.error(e);
  }
}

database();
