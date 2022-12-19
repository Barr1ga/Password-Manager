const express = require("express");
const router = express.Router();
const {
  createUser,
  removeUser,
  getMasterPasswordHint,
  getUserData,
  getVaultOwners,
  updateUserData,
  updateUserEmail,
  updateUserPasswordHint,
  joinVault,
  generateVirgilJwt,
} = require("../controllers/userController");

router.route("/createUser").post(createUser);
router.route("/removeUser").post(removeUser);
router.route("/getMasterPasswordHint").post(getMasterPasswordHint);
router.route("/getUserData").post(getUserData);
router.route("/getVaultOwners").post(getVaultOwners);
router.route("/updateUserData").post(updateUserData);
router.route("/updateUserEmail").post(updateUserEmail);
router.route("/updateUserPasswordHint").post(updateUserPasswordHint);
router.route("/joinVault").post(joinVault);
router.route("/virgil-jwt").post(generateVirgilJwt);

module.exports = router;
