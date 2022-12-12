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

// auth
app.use("/api/auth", require("./routes/authRoutes"));

// member
app.use("/api/member", require("./routes/memberRoutes"));
app.use("/api/kickMember", require("./routes/memberRoutes"));
app.use("/Roles/api/member", require("./routes/memberRoutes"));

// folder
app.use("/api/folder", require("./routes/folderRoutes"));
app.use("/Folders/api/folder", require("./routes/folderRoutes"));

// role
app.use("/api/role", require("./routes/roleRoutes"));
app.use("/Roles/api/role", require("./routes/roleRoutes"));

// item
app.use("/api/item", require("./routes/itemRoutes"));
app.use("/Types/api/item", require("./routes/itemTypeRoutes"));
app.use("/Folders/api/item", require("./routes/itemFolderRoutes"));
app.use("/Trash/api/item", require("./routes/itemFolderRoutes"));

// notification
app.use("/api/notification", require("./routes/notificationRoutes"));

// audit logs
app.use("/api/auditLog", require("./routes/auditLogRoutes"));
app.use("/Types/api/auditLog", require("./routes/auditLogRoutes"));
app.use("/Folders/api/auditLog", require("./routes/auditLogRoutes"));
app.use("/Roles/api/auditLog", require("./routes/auditLogRoutes"));
app.use("/Trash/api/auditLog", require("./routes/auditLogRoutes"));

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
