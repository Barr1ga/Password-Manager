const express = require("express");
const router = express.Router();
const {
  getFolderSpecific,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

router.route("/updateItem").post(updateItem);
router.route("/deleteItem").post(deleteItem);

module.exports = router;
