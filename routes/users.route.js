const express = require("express");
const { UserModel } = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.send("Already registered with this email");
    }
    bcrypt.hash(password, 5, async (err, encrypted_pass) => {
      if (err) {
        res.send("Error", err);
      } else {
        const user = new UserModel({
          username,
          email,
          password: encrypted_pass,
        });
        await user.save();
        res.send("User Registered");
      }
    });
  } catch (error) {
    res.send("Error while registering");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    const hashed_pass = user?.password;

    bcrypt.compare(password, hashed_pass, (err, result) => {
      if (result) {
        const token = jwt.sign({ userID: user._id }, "coder");
        res.send({ message: "Logged in successfully", token });
      } else {
        res.send("Wrong Credentials");
      }
    });
  } catch (error) {
    res.send("Error", error);
  }
});

module.exports = { userRouter };
