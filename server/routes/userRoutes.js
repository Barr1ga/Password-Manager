const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = requre("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exportss = router;
