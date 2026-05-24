require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const seedPages = require("./src/seeds/page.seed");

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");

    // ✅ SAFE: seed AFTER DB connection
    await seedPages();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
  }
}

startServer();