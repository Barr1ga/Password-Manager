const express = require("express");
const router = express.Router();
const {
  createUser,
  removeUser,
  getMasterPasswordHint,
  getUserData,
} = require("../controllers/userController");

router.route("/createUser").post(createUser);
router.route("/removeUser").post(removeUser);
router.route("/getMasterPasswordHint").post(getMasterPasswordHint);
router.route("/getUserData").post(getUserData);

module.exports = router;
