const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  try {
    const user = await User.login(email, password);
    const name = user.name;
    const token = createToken(user._id);
    res.status(200).json({ email, token, name, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, type, DOB, contact_no, student_id, NIC } =
    req.body;
  const date = await User.findOne({ email });

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

const getUserDetails = async (req, res) => {
  const { userEmail } = req.body; // Extract userEmail from the request body

  if (!userEmail) {
    return res.status(400).json({ error: "Email is required" });
  }

  console.log(userEmail);

  try {
    // Find user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the user details as the response
    res.status(200).json({
      name: user.name,
      email: user.email,
      type: user.type,
      DOB: user.DOB,
      contact_no: user.contact_no,
      student_id: user.student_id,
      NIC: user.NIC,
    });
  } catch (error) {
    // Handle any errors that occur during the database query
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserDetails };
