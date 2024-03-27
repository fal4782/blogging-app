const dotenv = require("dotenv");
const express = require("express");
require("./db/connection");
const authRouter = require("./api/authRoutes");
const cors = require("cors");
const protectedRouter = require("./api/protectedRoutes");
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(protectedRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
