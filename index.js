const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/users.route");
const { chatRouter } = require("./routes/chat.route");
const { authenticate } = require("./middleware/authenticate");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.get("/home", (req, res) => {
  res.send("Getting data");
});
app.use("/user", userRouter);
app.use("/chat", authenticate, chatRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error while connecting to DB");
  }
  console.log(`Server is running at port ${process.env.port}`);
});
