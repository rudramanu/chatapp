const express = require("express");
const chatRouter = express.Router();

chatRouter.get("/welcome", (req, res) => {
  try {
    res.send("Welcome buddy");
  } catch (error) {
    res.send({ message: "Please login first" });
  }
});

module.exports = { chatRouter };
