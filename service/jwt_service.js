const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const inputToken = (data) => {
  const token = jwt.sign(data, SECRET_KEY);
  return token;
};

const tokenCheck = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401).json({
      msg: "token not found",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, username) => {
    if (err) {
      res.status(401).json({
        success: false,
        error: err,
      });
    } else {
      req.username = username;
      next();
    }
  });
};

module.exports = { inputToken, tokenCheck };
