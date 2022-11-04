const express = require("express");
const router = express.Router();
const {
  getFolderSpecific,
  createItem,
} = require("../controllers/itemController");

router.route("/getFolderSpecific").post(getFolderSpecific);
router.route("/createItem").post(createItem);

module.exports = router;
