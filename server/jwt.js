import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in the environment variables.");
}

export function generateToken(payload, expiresIn = "1h") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error(`Token verification failed: ${error.message}`);
  }
}
