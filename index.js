require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(formidable());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Import des routes
const userRoutes = require("./routes/user");

// Initialisation des routes
app.use(userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});
