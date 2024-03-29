const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({
        message: "Unauthorized: Missing Authorization header",
      });
    }

    const token = authorizationHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Missing user access token",
      });
    }

    // Validate the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Forbidden: Invalid token",
        });
      }
      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    // console.error("Error authenticating user:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = authenticateUser;
