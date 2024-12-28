const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const date = await User.findOne({ email });

  try {
    const user = await User.register(name, email, password);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser };
