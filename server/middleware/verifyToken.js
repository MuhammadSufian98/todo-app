import { verifyToken } from "../jwt.js";

const VerifyTokenMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(req);
  if (token) {
    const bearerToken = token.split(" ")[1];
    try {
      const decoded = verifyToken(bearerToken);
      if (decoded) {
        next();
      } else {
        return res.status(401).json({ msg: "Token verification failed" });
      }
    } catch (error) {
      return res.status(401).json({ msg: "Token verification failed" });
    }
  } else {
    return res.status(401).json({ msg: "No token provided" });
  }
};

export default VerifyTokenMiddleware;
