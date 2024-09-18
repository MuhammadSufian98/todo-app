const jwt = require("jsonwebtoken");

const SECRET_KEY = "4F7dK!9rT@zQ2bXwL7mA#5fR";

function generateToken(payload, expiresIn = "1h") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid token");
  }
}

module.exports = { generateToken, verifyToken };
