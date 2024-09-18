const express = require("express");
const LoginRouter = express.Router();
const {
  userLogin,
  verifyJwtToken,
  registerNewUser,
} = require("../controllers/login.js");

LoginRouter.post("/login", userLogin);
LoginRouter.post("/verifyToken", verifyJwtToken);
LoginRouter.post("/register", registerNewUser);

module.exports = LoginRouter;
