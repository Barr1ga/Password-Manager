const express = require("express");
const router = express.Router();
const {
  createUser,
  removeUser,
  getMasterPasswordHint,
} = require("../controllers/userController");

router.route("/createUser").post(createUser);
router.route("/removeUser").post(removeUser);
router.route("/getMasterPasswordHint").post(getMasterPasswordHint);

module.exports = router;
