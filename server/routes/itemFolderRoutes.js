const express = require("express");
const router = express.Router();
const {
  getFolderSpecific,
  createItem,
  updateItem,
} = require("../controllers/itemController");

router.route("/getFolderSpecific").post(getFolderSpecific);
router.route("/createItem").post(createItem);
router.route("/updateItem").post(updateItem);

module.exports = router;
