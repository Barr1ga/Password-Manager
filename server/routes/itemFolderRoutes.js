const express = require("express");
const router = express.Router();
const {
  getFolderSpecific,
} = require("../controllers/itemController");

router.route("/getFolderSpecific").post(getFolderSpecific);

module.exports = router;
