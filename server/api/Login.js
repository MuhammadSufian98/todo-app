import express from "express";
const LoginRouter = express.Router();
import {
  userLogin,
  verifyJwtToken,
  registerNewUser,
  running
} from "../controllers/login.js";

LoginRouter.get("/check", running);
LoginRouter.post("/login", userLogin);
LoginRouter.post("/verifyToken", verifyJwtToken);
LoginRouter.post("/register", registerNewUser);

export default LoginRouter;
