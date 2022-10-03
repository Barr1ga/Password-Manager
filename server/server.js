const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { errorHandler } = require("./middlewares/errorHandler");
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, console.log("Started on port " + port));
