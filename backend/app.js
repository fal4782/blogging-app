const dotenv = require("dotenv");
const express = require("express");
require("./db/connection");
const router = require("./api/routes");
const cors = require("cors");
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
