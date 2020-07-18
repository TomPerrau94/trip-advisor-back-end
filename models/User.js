const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: { type: String, required: true },
  token: String,
  hash: String,
  salt: String,
  account: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
  },
});

module.exports = User;
