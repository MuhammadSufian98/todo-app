import UserModel from "../mongoDB/loginSchema.js";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../jwt.js";

export const userLogin = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  try {
    const user = await UserModel.findOne({ email: Email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(Password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const token = generateToken({ userId: user._id, email: user.email });
    return res.json({ user, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ error: "Failed to log in" });
  }
};

export const verifyJwtToken = async (req, res) => {
  const { Token } = req.body;
  if (!Token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decodedToken = verifyToken(Token);
    return res.json({ message: "Token is valid", verified: true, decodedToken });
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const registerNewUser = async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;

  if (!FirstName || !Email || !Password) {
    return res.status(400).json({ error: "First name, email, and password are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ email: Email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const newUser = new UserModel({
      FirstName: FirstName,
      LastName: LastName,
      email: Email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

