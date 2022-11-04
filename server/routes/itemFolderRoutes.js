const express = require("express");
const router = express.Router();
const {
  getFolderSpecific,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

router.route("/getFolderSpecific").post(getFolderSpecific);
router.route("/createItem").post(createItem);
router.route("/updateItem").post(updateItem);
router.route("/deleteItem").post(deleteItem);

module.exports = router;
