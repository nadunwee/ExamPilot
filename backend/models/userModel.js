const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  DOB: {
    type: String,
    require: true,
  },
  contact_no: {
    type: String,
    require: true,
  },
  student_id: {
    type: String,
    require: true,
  },
  NIC: {
    type: String,
    require: true,
  },
});

// static register method
userSchema.statics.register = async function (
  name,
  email,
  password,
  type,
  DOB,
  contact_no,
  student_id,
  NIC
) {
  // validation
  if (!email || !password || !name) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  // if (!validator.isStrongPassword(password)) {
  //   throw error("Password is not strong enough");
  // }

  console.log(email, password, name, type, DOB, contact_no, student_id, NIC);

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  if (!exists && email && password && name) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({
      name,
      email,
      password: hash,
      type,
      DOB,
      contact_no,
      student_id,
      NIC,
    });

    return user;
  }
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
