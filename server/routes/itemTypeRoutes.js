const express = require("express");
const router = express.Router();
const {
  getTypeSpecific,
} = require("../controllers/itemController");

router.route("/getTypeSpecific").post(getTypeSpecific);

module.exports = router;
