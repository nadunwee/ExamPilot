const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const name = user.name;
    const token = createToken(user._id);
    res.status(200).json({ email, token, name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, type, DOB, contact_no, student_id, NIC } =
    req.body;
  const date = await User.findOne({ email });

  console.log(email, password, name, type, DOB, contact_no, student_id, NIC);

  try {
    const user = await User.register(
      name,
      email,
      password,
      type,
      DOB,
      contact_no,
      student_id,
      NIC
    );
    // create a token
    const token = createToken(user._id);
    res
      .status(200)
      .json({ name, email, token, type, DOB, contact_no, student_id, NIC });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
