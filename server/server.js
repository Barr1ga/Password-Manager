const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv').config();
const { errorHandler } = require("./middlewares/errorHandler");

const port = process.env.PORT || 6000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/authRoutes"));

app.use(errorHandler);

app.listen(port, console.log("Started on port " + port));
