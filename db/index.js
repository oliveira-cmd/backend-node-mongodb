const mongoose = require("mongoose");
require("dotenv").config();

async function runDatabase() {
  try {
    await mongoose.connect(process.env.URI_CONNECT, {});
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Error connecting to database: ", error);
    process.exit(1);
  }
}

module.exports = {runDatabase};
