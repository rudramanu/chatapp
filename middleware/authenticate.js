const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (token) {
      const decoded = jwt.verify(token, "coder");
      if (decoded) {
        next();
      } else {
        res.send("Please login first");
      }
    } else {
      res.send("Please login first");
    }
  } catch (error) {
    res.send("Please login first");
  }
};

module.exports = { authenticate };
