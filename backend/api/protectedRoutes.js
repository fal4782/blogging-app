const express = require("express");
const protectedRouter = express.Router();
const client = require("../db/connection.js");
const authenticateUser = require("/home/falguni/Desktop/blogging-app-vue/backend/middleware/authMiddleware.js");

protectedRouter.use(authenticateUser);

protectedRouter.get("/user/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const response = await client.query(
      "SELECT id, username, email FROM users WHERE email = $1;",
      [userEmail]
    );
    if (response.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = response.rows[0];
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

protectedRouter.post("/publish", async (req, res) => {
  try {
    const { userId, title, content } = req.body;

    const response = await client.query(
      "INSERT INTO posts (user_id,title, content) VALUES ($1, $2, $3) RETURNING *;",
      [userId, title, content]
    );

    const newPost = response.rows[0];

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

protectedRouter.get("/posts", async (req, res) => {
  try {
    const response = await client.query(
      "SELECT users.username, posts.* FROM users JOIN posts ON users.id = posts.user_id;"
    );
    const posts = response.rows;
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

protectedRouter.get("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const response = await client.query(
      "SELECT users.username, posts.* FROM users JOIN posts ON users.id = posts.user_id WHERE posts.id = $1;",
      [postId]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({
        error: "Post not found",
      });
    }
    const post = response.rows[0];
    res.json(post);
  } catch (error) {
    console.error("Error fetching post details:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

protectedRouter.delete("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const response = await client.query("DELETE FROM posts WHERE id = $1", [
      postId,
    ]);

    if (response.rowCount === 0) {
      return res.status(404).json({
        error: "Post not found",
      });
    }
    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

protectedRouter.get("/posts/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const response = await client.query(
      "SELECT users.username, posts.* FROM users JOIN posts ON users.id = posts.user_id WHERE user_id = $1;",
      [userId]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({
        error: "No posts created yet",
      });
    }
    const posts = response.rows;
    res.json(posts);
  } catch (error) {
    // console.error("Error fetching posts:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

protectedRouter.put("/user/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const { username } = req.body;
    const response = await client.query(
      "UPDATE users SET username = $1 WHERE id = $2 RETURNING *;",
      [username, userId]
    );
    if (response.rows.length === 0) {
      return res.status(404).json({
        error: "User does not exist",
      });
    }
    console.log(response.rows[0].username);
    res.json({
      message: "Username changed successfully",
      username: response.rows[0].username,
    });
  } catch (error) {
    // console.log(error.response.data);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = protectedRouter;
