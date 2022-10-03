const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controllers/userController");

router.post("/createUser", createUser);

module.exports = router;
