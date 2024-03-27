const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../db/connection.js");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

authRouter.post("/signup", async (req, res) => {
  try {
    console.log("signup req body: ", req.body);
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await client.query(
      "SELECT * FROM users WHERE email = $1;",
      [email]
    );
    if (existingUser.rows.length > 0) {
      console.log("user already exists");
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    // Insert new user into the database
    await client.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3);",
      [username, email, hashedPassword]
    );

    // Generate JWT token
    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User created successfully",
      token,
      email,
    });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.rows[0].id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, email: user.rows[0].email });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = authRouter;
