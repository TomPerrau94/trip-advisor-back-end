const express = require("express");
const router = express.Router();

const User = require("../models/User");

const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");

router.post("/sign-up", async (req, res) => {
  try {
    const { firstname, lastname, email, password, description } = req.fields;

    const salt = uid2(16);

    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(16);

    const newUser = new User({
      email: email,
      token: token,
      hash: hash,
      salt: salt,
      account: {
        firstname: firstname,
        lastname: lastname,
      },
    });

    await newUser.save();

    res.status(200).json({
      _id: newUser._id,
      email: newUser.email,
      token: newUser.token,
      account: newUser.account,
    });
    console.log(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
