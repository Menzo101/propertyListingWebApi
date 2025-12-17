const bcrypt = require("bcrypt");
const User = require("../models/usermodel.js");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { userName, lastName, email, password } = req.body;

    // 1. Check if email is taken;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // 3. Create user
    const myuserDetails = await User.create({
      userName,
      lastName,
      email,
      password,
    });

    const token = jwt.sign(
      { name: myuserDetails._id },
      process.env.MY_SECRET_PIN,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).json({
      message: "User created successfully",
      myuserDetails,
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ message: "invalid email/password" });
    }
    const matchPassword = await bcrypt.compare(password, userData.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "invalid email/password" });
    }
    const token = jwt.sign({ name: userData._id }, process.env.MY_SECRET_PIN, {
      expiresIn: "1d",
    });
    res.cookie("mytoken", token, {
      HttpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "login successful",
      userData,
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("mytoken");
    return res.status(200).json({ message: "logout successful" });
  } catch (error) {
    console.log(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find();
    return res.status(200).json({ users: getAllUsers });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { registerUser, login, logout, getAllUsers };
