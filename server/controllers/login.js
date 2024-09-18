const UserModel = require("../mongoDB/loginSchema.js");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../jwt.js");

const userLogin = async (req, res) => {
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

    res.json({ user, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
};

const verifyJwtToken = async (req, res) => {
  const { Token } = req.body;
  try {
    const isVerified = verifyToken(Token);
    if (isVerified) {
      res.json({ message: "Token is valid", verifyToken: true });
    } else {
      res.status(401).json({ message: "Token is invalid", verifyToken: false });
    }
  } catch (err) {
    res.status(500).json({ error: "Token verification failed" });
  }
};

const registerNewUser = async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;

  if (!FirstName || !Email || !Password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Password, salt);
    const newUser = await UserModel.create({
      FirstName,
      LastName,
      email: Email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = { userLogin, verifyJwtToken, registerNewUser };
