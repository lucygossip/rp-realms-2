require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());

// ROUTES HERE //

app.use(express.json());

// Define the port number for the server
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // Listen for requests only after connecting to DB:
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & listening on port ${process.env.PORT}!`);
    });
  })
  // If there's an error connecting, we will see that in the terminal:
  .catch((error) => console.log(error));