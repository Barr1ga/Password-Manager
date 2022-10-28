const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlewares/errorHandler");
const path = require("path");
const port = process.env.PORT || 6000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/authRoutes"));

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) =>
    res.send("Node environment is not running in production mode")
  );
}

app.listen(port, console.log("Started on port " + port));
