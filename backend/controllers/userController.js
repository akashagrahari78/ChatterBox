const userModel = require("../models/UserModel")


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
require("dotenv").config();


const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await userModel.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          userId: user._id.toString(),
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Email or password is incorrect" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const emailNormalized = email.trim().toLowerCase();

    // Check if user exists
    const exists = await userModel.findOne({ email: emailNormalized });
    console.log(exists);
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(emailNormalized)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email.",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password (minimum 8 characters).",
      });
    }

    // Hash password and create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email: emailNormalized,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: newUser._id.toString(), // Make sure this is a string
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    return res.status(201).json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {userLogin, userRegister}