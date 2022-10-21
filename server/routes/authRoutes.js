const express = require("express");
const router = express.Router();
const {
  createUser,
  removeUser,
  getMasterPasswordHint,
  getUserData,
  updateUserData,
  updateUserEmail,
  updateUserPasswordHint,
} = require("../controllers/userController");

router.route("/createUser").post(createUser);
router.route("/removeUser").post(removeUser);
router.route("/getMasterPasswordHint").post(getMasterPasswordHint);
router.route("/getUserData").post(getUserData);
router.route("/updateUserData").post(updateUserData);
router.route("/updateUserEmail").post(updateUserEmail);
router.route("/updateUserPasswordHint").post(updateUserPasswordHint);

module.exports = router;
